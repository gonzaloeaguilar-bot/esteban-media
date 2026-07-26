import fs from "fs";
import path from "path";

// Load .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_CdQhFqvt_CPeGcaKR3az2W5LjKMgKNhpq";
const TARGET_EMAIL = "esmolopez@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Esteban Moreno Media <contact@estebanmorenomedia.com>";

async function sendSampleEmail() {
  console.log(`Sending live sample email via Resend to ${TARGET_EMAIL}...`);

  const subject = "📍 [MUESTRA / SAMPLE] Propuesta de Video Promocional para Davie Blvd Latin Bistro (Fort Lauderdale 33317)";

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="font-weight: 800; font-size: 20px; color: #0f172a; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        🎬 Esteban Moreno Media | Muestra de Email Automatizado
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #334155;">
        Hola equipo de <strong>Davie Blvd Latin Bistro & Grill</strong>,
      </p>

      <p style="font-size: 15px; line-height: 1.6; color: #334155;">
        Auditamos su perfil en Google Maps cerca de Fort Lauderdale / 33317 (a solo <strong>0.5 millas de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes opiniones (<strong>4.8⭐ con 142 reseñas</strong>), pero su Instagram carece de un Reel promocional 9:16 fijado.
      </p>

      <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #0f172a; font-size: 15px;">
          👉 Les comparto un ejemplo de cómo editamos contenido de restaurantes & hospitalidad:
        </p>
        <a href="https://estebanmorenomedia.com/es/portafolio/bar-door-monkey" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Ver Muestra de Video para Restaurantes 🎬
        </a>
      </div>

      <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #0f172a; font-size: 15px;">
          📊 O pueden calcular la estimación de producción & edición en 30 segundos:
        </p>
        <a href="https://estebanmorenomedia.com/es/calculadora" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Calculadora de Presupuesto en 30s ⚡
        </a>
      </div>

      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 24px;">
        Saludos,<br/>
        <strong>Esteban Moreno</strong> | Esteban Moreno Media<br/>
        📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317<br/>
        🌐 <a href="https://estebanmorenomedia.com/es" style="color: #2563eb;">estebanmorenomedia.com/es</a>
      </p>

      <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
        Este es un mensaje de prueba enviado mediante la API de Resend para Esteban Moreno Media.
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TARGET_EMAIL],
        subject,
        html: htmlContent,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ LIVE SAMPLE EMAIL DISPATCHED TO ${TARGET_EMAIL}! Resend ID: ${data.id}`);
    } else {
      const errText = await res.text();
      console.error(`❌ Resend API Error (${res.status}): ${errText}`);
    }
  } catch (err) {
    console.error(`❌ Exception sending sample email:`, err);
  }
}

sendSampleEmail();
