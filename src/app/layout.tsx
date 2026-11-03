import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  keywords: [
    "WebDev Software Solutions",
    "webdevss.tech",
    "Full Stack MERN",
    "React 19 Next.js",
    "Cloud Architecture",
    "Server Engineering",
    "Shopify WooCommerce",
  ],
  openGraph: {
    title: "WebDev Software Solutions | Full Stack & Cloud Engineering",
    description:
      "Enterprise web applications, high-performance MERN platforms, Linux server infrastructure, and conversion-focused e-commerce solutions for global businesses.",
    siteName: "WebDev Software Solutions",
    locale: "de_DE",
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WebDev Software Solutions',
    url: 'https://webdevss.tech',
    logo: 'https://webdevss.tech/images/logo/dark-logo-webdevss-big.webp',
    description: 'Enterprise web applications, full-stack software, cloud architecture, and e-commerce solutions.',
    sameAs: [
      'https://github.com/webdevsoftware',
      'https://www.linkedin.com/in/webdevss',
    ],
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="256x256" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#0b0f19] font-sans text-slate-100 antialiased selection:bg-[#BBE7F1] selection:text-slate-950">
        <ThemeProvider>
          <LanguageProvider>
            <AppProvider>
              <AppShell>
                {children}
              </AppShell>
            </AppProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
