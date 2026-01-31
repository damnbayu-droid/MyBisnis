import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mybisnis.id'),
  title: {
    default: "MyBisnis - Platform Marketplace Digital & Transportasi Indonesia",
    template: "%s | MyBisnis Indonesia"
  },
  description: "Platform ekosistem digital terintegrasi untuk UMKM Indonesia. Jual beli online, layanan ojek & pengiriman, hingga manajemen toko dalam satu aplikasi super.",
  keywords: ["marketplace indonesia", "aplikasi ojek online", "umkm digital", "jualan online gratis", "delivery makanan", "sistem zonasi", "investasi startup", "asean digital economy"],
  authors: [{ name: "MyBisnis Team", url: "https://mybisnis.id" }],
  creator: "MyBisnis Indonesia",
  publisher: "PT MyBisnis Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/Favicon.webp",
    apple: "/Favicon.webp",
  },
  openGraph: {
    title: "MyBisnis - Platform Marketplace Digital & Transportasi Indonesia",
    description: "Revolusi digital UMKM Indonesia. Satu platform untuk Jualan, Belanja, dan Transportasi dengan biaya termurah.",
    url: "https://mybisnis.id",
    siteName: "MyBisnis Indonesia",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "MyBisnis Ecosystem Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyBisnis - Platform Marketplace Digital & Transportasi Indonesia",
    description: "Revolusi digital UMKM Indonesia. Satu platform untuk Jualan, Belanja, dan Transportasi.",
    creator: "@mybisnis_id",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

// ... existing imports

import { TooltipProvider } from "@/components/ui/tooltip";
import AutoLogout from "@/components/auth/AutoLogout";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <div className="relative min-h-screen flex flex-col">
                {children}
              </div>
              <Toaster />
              <AutoLogout />
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
