export default function SpanishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div lang="es">{children}</div>;
}
