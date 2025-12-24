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
  title: "MyBisnis - Platform Marketplace UMKM Digital Indonesia",
  description: "Kembangkan bisnis Anda dengan mudah. Buat toko online profesional, kelola produk, dan raih lebih banyak pelanggan dengan sistem marketplace terintegrasi.",
  keywords: ["marketplace UMKM", "toko online", "bisnis digital", "jual beli produk", "pengiriman", "Indonesia", "MyBisnis"],
  authors: [{ name: "MyBisnis Team" }],
  icons: {
    icon: "https://mybisnis.shop/favicon.ico",
  },
  openGraph: {
    title: "MyBisnis - Platform Marketplace UMKM Digital Indonesia",
    description: "Kembangkan bisnis Anda dengan mudah. Buat toko online profesional, kelola produk, dan raih lebih banyak pelanggan dengan sistem marketplace terintegrasi.",
    url: "https://mybisnis.shop",
    siteName: "MyBisnis",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyBisnis - Platform Marketplace UMKM Digital Indonesia",
    description: "Kembangkan bisnis Anda dengan mudah. Buat toko online profesional, kelola produk, dan raih lebih banyak pelanggan dengan sistem marketplace terintegrasi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
