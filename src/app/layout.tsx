import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/AppShell";

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://webdevss.tech"),
  title: {
    default: "WebDev Software Solutions | Full Stack & Cloud Engineering",
    template: "%s | WebDev Software Solutions",
  },
  description:
    "Enterprise web applications, high-performance MERN platforms, Linux server infrastructure, and conversion-focused e-commerce solutions for global businesses.",
  keywords: [
    "WebDev Software Solutions",
    "webdevss.tech",
    "Full Stack MERN",
    "React 19 Next.js",
    "Cloud Architecture",
    "Server Engineering",
    "Shopify WooCommerce",
  ],
  alternates: {
    canonical: "https://webdevss.tech",
  },
  openGraph: {
    title: "WebDev Software Solutions | Full Stack & Cloud Engineering",
    description:
      "Enterprise web applications, high-performance MERN platforms, Linux server infrastructure, and conversion-focused e-commerce solutions for global businesses.",
    url: "https://webdevss.tech",
    siteName: "WebDev Software Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDev Software Solutions",
    description: "Enterprise web applications, high-performance MERN platforms & modern cloud architecture.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  authors: [{ name: "Al Mumeetu Saikat" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="256x256" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@1,500;1,600;1,700&family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 antialiased selection:bg-[#BBE7F1] selection:text-slate-950">
        <LanguageProvider>
          <AppProvider>
            <AppShell>
              {children}
            </AppShell>
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
