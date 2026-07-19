#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const adminApi = "https://analyticsadmin.googleapis.com/v1beta";
const adminAlphaApi = "https://analyticsadmin.googleapis.com/v1alpha";
const tokenPath =
  process.env.GA4_ADMIN_TOKEN_PATH ||
  join(homedir(), ".config/geebs/google_analytics_admin_token.json");
const accountId = requiredEnv("GA4_ACCOUNT_ID", /^\d+$/);
const displayName =
  process.env.GA4_PROPERTY_DISPLAY_NAME || "Esteban Moreno Media";
const defaultUri = normalizeOrigin(
  process.env.GA4_DEFAULT_URI || "https://estebanmorenomedia.com",
);
const timeZone = process.env.GA4_TIME_ZONE || "America/New_York";
const currencyCode = process.env.GA4_CURRENCY_CODE || "USD";

function requiredEnv(name, pattern) {
  const value = process.env[name]?.trim();
  if (!value || !pattern.test(value)) {
    throw new Error(`${name} is required and must match ${pattern}`);
  }
  return value;
}

function normalizeOrigin(value) {
  return new URL(value).origin;
}

function loadToken() {
  const token = JSON.parse(readFileSync(tokenPath, "utf8"));
  for (const field of ["client_id", "client_secret", "refresh_token"]) {
    if (!token[field]) {
      throw new Error(`Analytics Admin token is missing ${field}`);
    }
  }
  return token;
}

async function refreshAccessToken(token) {
  const response = await fetch(
    token.token_uri || "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: token.client_id,
        client_secret: token.client_secret,
        refresh_token: token.refresh_token,
        grant_type: "refresh_token",
      }),
    },
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error || !payload.access_token) {
    const detail =
      payload.error_description || payload.error || `HTTP ${response.status}`;
    throw new Error(`Analytics Admin token refresh failed: ${detail}`);
  }
  return payload.access_token;
}

async function api(accessToken, method, path, body, baseUrl = adminApi) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const detail = payload?.error?.message || `HTTP ${response.status}`;
    throw new Error(`Analytics Admin API ${method} ${path} failed: ${detail}`);
  }
  return payload;
}

async function ensureEnhancedMeasurement(accessToken, stream) {
  const settingsPath = `/${stream.name}/enhancedMeasurementSettings`;
  const current = await api(
    accessToken,
    "GET",
    settingsPath,
    undefined,
    adminAlphaApi,
  );

  if (current.streamEnabled && current.pageChangesEnabled) {
    return { settings: current, status: "existing" };
  }

  const updateMask = new URLSearchParams({
    updateMask: "stream_enabled,page_changes_enabled",
  });
  const settings = await api(
    accessToken,
    "PATCH",
    `${settingsPath}?${updateMask.toString()}`,
    {
      name: `${stream.name}/enhancedMeasurementSettings`,
      streamEnabled: true,
      pageChangesEnabled: true,
    },
    adminAlphaApi,
  );
  return { settings, status: "updated" };
}

function numericId(resourceName, prefix) {
  const match = new RegExp(`^${prefix}/(\\d+)$`).exec(resourceName || "");
  if (!match) {
    throw new Error(`Unexpected Analytics resource name: ${resourceName}`);
  }
  return match[1];
}

async function findOrCreateProperty(accessToken) {
  const query = new URLSearchParams({
    filter: `parent:accounts/${accountId}`,
    pageSize: "200",
    showDeleted: "false",
  });
  const existing = await api(
    accessToken,
    "GET",
    `/properties?${query.toString()}`,
  );
  const matches = (existing.properties || []).filter(
    (property) => property.displayName === displayName,
  );
  if (matches.length > 1) {
    throw new Error(
      `Multiple GA4 properties match ${JSON.stringify(displayName)}; resolve the duplicate before continuing`,
    );
  }
  if (matches.length === 1) {
    return { property: matches[0], status: "existing" };
  }

  const property = await api(accessToken, "POST", "/properties", {
    parent: `accounts/${accountId}`,
    displayName,
    timeZone,
    currencyCode,
  });
  return { property, status: "created" };
}

async function findOrCreateWebStream(accessToken, propertyId) {
  const path = `/properties/${propertyId}/dataStreams`;
  const existing = await api(accessToken, "GET", path);
  const matches = (existing.dataStreams || []).filter(
    (stream) =>
      stream.type === "WEB_DATA_STREAM" &&
      normalizeOrigin(stream.webStreamData?.defaultUri || "about:blank") ===
        defaultUri,
  );
  if (matches.length > 1) {
    throw new Error(
      `Multiple GA4 web streams target ${defaultUri}; resolve the duplicate before continuing`,
    );
  }
  if (matches.length === 1) {
    return { stream: matches[0], status: "existing" };
  }

  const stream = await api(accessToken, "POST", path, {
    type: "WEB_DATA_STREAM",
    displayName: new URL(defaultUri).hostname,
    webStreamData: { defaultUri },
  });
  return { stream, status: "created" };
}

try {
  const accessToken = await refreshAccessToken(loadToken());
  const propertyResult = await findOrCreateProperty(accessToken);
  const propertyId = numericId(propertyResult.property.name, "properties");
  const streamResult = await findOrCreateWebStream(accessToken, propertyId);
  const measurementId = streamResult.stream.webStreamData?.measurementId;

  if (!/^G-[A-Z0-9]+$/.test(measurementId || "")) {
    throw new Error("GA4 web stream did not return a valid measurement ID");
  }

  const enhancedMeasurementResult = await ensureEnhancedMeasurement(
    accessToken,
    streamResult.stream,
  );

  console.log(
    JSON.stringify(
      {
        accountId,
        propertyId,
        propertyStatus: propertyResult.status,
        streamId: numericId(streamResult.stream.name, "properties/\\d+/dataStreams"),
        streamStatus: streamResult.status,
        measurementId,
        defaultUri,
        enhancedMeasurementStatus: enhancedMeasurementResult.status,
        enhancedMeasurement: {
          streamEnabled: enhancedMeasurementResult.settings.streamEnabled,
          pageChangesEnabled:
            enhancedMeasurementResult.settings.pageChangesEnabled,
        },
        token: "redacted",
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.error(`GA4 provisioning failed: ${error.message || error}`);
  process.exit(1);
}
