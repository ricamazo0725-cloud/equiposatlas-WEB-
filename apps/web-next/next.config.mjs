/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // Encabezados de seguridad propios de la app (equivalentes a los que
    // tenía apps/web/public/.htaccess para el sitio Vite, corregidos para
    // Next.js). Importante: si en el dominio de Hostinger todavía queda un
    // .htaccess viejo agregando también un Content-Security-Policy, los
    // navegadores combinan ambas políticas de forma restrictiva (toman lo
    // más estricto de cada una) — hay que quitar ese .htaccess viejo del
    // documento raíz del dominio para que esta política sea la única activa.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.supabase.co https://*.supabase.in https://maps.googleapis.com https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
