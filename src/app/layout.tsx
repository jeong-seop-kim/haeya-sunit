import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Haeya Sunit",
  description: "할 일 관리 애플리케이션",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  openGraph: {
    title: "Haeya Sunit",
    description: "할 일 관리 애플리케이션",
    url: "https://haeya-sunit.vercel.app",
    siteName: "Haeya Sunit",
    images: [
      {
        url: "/sun.png",
        width: 1200,
        height: 630,
        alt: "Haeya Sunit Logo",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haeya Sunit",
    description: "할 일 관리 애플리케이션",
    images: ["/sun.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/sun.png",
    apple: "/sun.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Navigation />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
