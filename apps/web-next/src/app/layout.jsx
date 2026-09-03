import { Oswald, Poppins, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const SITE_URL = "https://equiposatlas.com";
const LOGO_URL =
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/logomainequiposatlas.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Equipos Atlas | Izaje de Carga y Maquinaria Amarilla",
  description:
    "Equipos Atlas — Alquiler de grúas telescópicas, telehandlers y camabajas para izaje de carga industrial en Colombia. Capacitación y cursos de manejo certificados.",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Equipos Atlas | Izaje de Carga y Maquinaria Amarilla",
    description:
      "Equipos Atlas — Alquiler de grúas telescópicas, telehandlers y camabajas para izaje de carga industrial en Colombia.",
    images: [{ url: LOGO_URL, width: 1200, height: 630 }],
  },
  verification: {
    google: "zvch5DvB3LA7TnBsNx1hsdhpDE9Fwmbmusv0QXLRsN4",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Equipos Atlas",
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "Alquiler de grúas telescópicas, telehandlers y camabajas para izaje de carga industrial en Colombia. Capacitación y cursos de manejo certificados.",
  telephone: "+573003085965",
  email: "gerencia@equiposatlas.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  areaServed: "CO",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${oswald.variable} ${poppins.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SVJF76MNSJ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SVJF76MNSJ');
          `}
        </Script>

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
