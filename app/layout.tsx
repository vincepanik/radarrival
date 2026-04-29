import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://co-rgl1.nanocorp.app"),
  title: "RadarRival | Veille concurrentielle hebdomadaire",
  description:
    "Chaque lundi, sachez exactement ce que font vos concurrents avec RadarRival. Landing page bilingue FR/EN. Starter 19€/mois, Pro 29€/mois, abonnement mensuel.",
  openGraph: {
    title: "RadarRival | Veille concurrentielle hebdomadaire",
    description:
      "Landing page bilingue FR/EN avec Starter à 19€/mois et Pro à 29€/mois.",
    url: "https://co-rgl1.nanocorp.app",
    siteName: "RadarRival",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RadarRival | Veille concurrentielle hebdomadaire",
    description:
      "Chaque lundi, sachez exactement ce que font vos concurrents. Starter 19€/mois, Pro 29€/mois.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <head>
        <script
          src="https://phospho-nanocorp-prod--nanocorp-api-fastapi-app.modal.run/beacon/snippet.js?s=co-rgl1"
          defer
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
