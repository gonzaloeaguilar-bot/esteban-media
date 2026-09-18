import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function launch(port = 9333) {
  const dir = mkdtempSync(join(tmpdir(), "em-uat-"));
  const proc = spawn(CHROME, [
    "--headless=new", `--remote-debugging-port=${port}`,
    `--user-data-dir=${dir}`, "--no-first-run", "--no-default-browser-check",
    "--disable-extensions", "--hide-scrollbars", "about:blank",
  ], { stdio: "ignore", detached: false });
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://127.0.0.1:${port}/json/version`); if (r.ok) break; } catch {}
    await new Promise(r => setTimeout(r, 250));
  }
  return { proc, port };
}

export async function newPage(port, { width, height }) {
  const t = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener("open", r, { once: true }));
  let id = 0; const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((res, rej) => {
    const myId = ++id; pending.set(myId, (m) => m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result));
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 2, mobile: width < 768,
  });
  const page = {
    send,
    close: () => { ws.close(); return fetch(`http://127.0.0.1:${port}/json/close/${t.id}`); },
    async goto(url) {
      await send("Page.navigate", { url });
      // wait for load
      for (let i = 0; i < 120; i++) {
        const { result } = await send("Runtime.evaluate", { expression: "document.readyState", returnByValue: true });
        if (result.value === "complete") break;
        await new Promise(r => setTimeout(r, 120));
      }
      await new Promise(r => setTimeout(r, 900)); // hydration + fonts
    },
    async eval(expr) {
      const { result, exceptionDetails } = await send("Runtime.evaluate", {
        expression: `(async () => { ${expr} })()`,
        awaitPromise: true, returnByValue: true,
      });
      if (exceptionDetails) throw new Error(exceptionDetails.text + " " + (exceptionDetails.exception?.description || ""));
      return result.value;
    },
    async resize(w, h) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: w < 768 });
    },
  };
  return page;
}
