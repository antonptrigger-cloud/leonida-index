import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd, siteGraph } from "@/lib/seo/jsonld";
import { OG_IMAGE, ROUTES, SITE, SOCIAL } from "@/lib/seo/site";
import { ExploreMore } from "@/components/ExploreMore";

const display = Bebas_Neue({
  variable: "--font-display-face",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: ROUTES["/"].title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["GTA 6 map", "GTA 6 interactive map", "Vice City map", "Leonida map", "GTA 6 guides", "GTA 6 secrets", "GTA 6 tips", "GTA VI"],
  category: "games",
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: ROUTES["/"].title,
    description: SITE.description,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", site: SOCIAL.xAt, creator: SOCIAL.xAt, title: ROUTES["/"].title, description: SITE.description, images: [OG_IMAGE.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col text-ink antialiased">
        <JsonLd data={siteGraph()} />
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4x py-10x sm:px-gutter">
          {children}
          <ExploreMore />
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
