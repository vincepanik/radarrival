import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Co — Veille Concurrentielle Hebdomadaire",
  description:
    "Chaque lundi, recevez un rapport complet sur vos concurrents. Changements web, réseaux sociaux, prix, nouveaux produits, recrutements et retombées presse. 49€/mois.",
  openGraph: {
    title: "Create Co — Veille Concurrentielle Hebdomadaire",
    description:
      "Chaque lundi, sachez exactement ce que font vos concurrents.",
    locale: "fr_FR",
    type: "website",
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
