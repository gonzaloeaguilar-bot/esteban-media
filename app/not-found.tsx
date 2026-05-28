// Top-level not-found rendered when middleware can't match a locale.
// Renders bare HTML because at this point we don't have a locale context.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#0a0a0a",
          color: "#ededed",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>404 — Not found</h1>
        <p>
          <a href="/en" style={{ color: "#fff", textDecoration: "underline" }}>
            Go home
          </a>{" "}
          /{" "}
          <a href="/es" style={{ color: "#fff", textDecoration: "underline" }}>
            Ir al inicio
          </a>
        </p>
      </body>
    </html>
  );
}
