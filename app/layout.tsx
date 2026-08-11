import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehi.ar"),
  title: {
    default: "MEHI | Atención, conocimiento y aprendizaje operacional",
    template: "%s | MEHI",
  },
  description:
    "Plataforma enterprise que conecta inteligencia artificial conversacional, conocimiento institucional y atención humana con trazabilidad de extremo a extremo.",
  applicationName: "MEHI",
  keywords: [
    "atención ciudadana",
    "inteligencia artificial conversacional",
    "gestión del conocimiento",
    "contact center",
    "atención de gran escala",
    "gobierno digital",
  ],
  authors: [{ name: "MEHI" }],
  creator: "MEHI",
  publisher: "MEHI",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "MEHI",
    title: "MEHI | Cada gestión se convierte en aprendizaje",
    description:
      "Atención, conocimiento institucional y aprendizaje operacional en una plataforma enterprise trazable.",
  },
  twitter: {
    card: "summary",
    title: "MEHI | Cada gestión se convierte en aprendizaje",
    description:
      "Atención, conocimiento institucional y aprendizaje operacional en una plataforma enterprise trazable.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F6FA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
