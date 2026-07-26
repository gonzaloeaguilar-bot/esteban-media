import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone") || "13054974478";
  const text = searchParams.get("text") || "Hola Esteban, vi tu propuesta de video";

  const encodedText = encodeURIComponent(text);

  // Clean HTML response that triggers native SMS app on iOS and Android
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirigiendo a SMS...</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background-color: #121214; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
    .card { background-color: #18181b; border: 1px solid #27272a; padding: 24px; border-radius: 16px; max-width: 320px; }
    .btn { background-color: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 20px; text-decoration: none; font-weight: 700; display: inline-block; margin-top: 16px; }
  </style>
  <script>
    window.onload = function() {
      // iOS Safari uses &body=, Android uses ?body=
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var smsUrl = 'sms:' + '${phone}' + (isIOS ? '&body=' : '?body=') + '${encodedText}';
      window.location.href = smsUrl;
    };
  </script>
</head>
<body>
  <div class="card">
    <h2>📱 Abriendo Mensajes (SMS)...</h2>
    <p>Si la aplicación de mensajes no abre automáticamente, toca el botón a continuación:</p>
    <a id="smsBtn" class="btn" href="sms:${phone}?body=${encodedText}">Enviar SMS Directo</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
