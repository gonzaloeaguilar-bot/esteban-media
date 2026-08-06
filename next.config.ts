import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/es/servicios/produccion-video-bienes-raices-coral-gables",
        destination: "/es/video-inmobiliario-coral-gables",
        permanent: true,
      },
      {
        source: "/es/servicios/produccion-video-firmas-abogados-miami",
        destination: "/es/produccion-de-video-para-firmas-de-abogados-miami",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
