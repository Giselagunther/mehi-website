import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const title = "MEHI — Tecnología para el gobierno que conversa con el ciudadano";
const description =
  "MEHI desarrolla software de atención ciudadana para organismos de gobierno en Argentina y Latinoamérica. Inteligencia artificial conversacional, gestión multicanal y trazabilidad de extremo a extremo.";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-ink`}>
        {children}
      </body>
    </html>
  );
}
