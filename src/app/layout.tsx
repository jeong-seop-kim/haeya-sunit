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
  title: "해야",
  description: "해야 할 일을 관리하는 애플리케이션",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  openGraph: {
    title: "해야",
    description: "해야 할 일을 관리하는 애플리케이션",
    url: "https://haeya-sunit.vercel.app",
    siteName: "해야",
    images: [
      {
        url: "https://imgur.com/a/o8kLyty",
        width: 1200,
        height: 630,
        alt: "해야 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "해야",
    description: "해야 할 일을 관리하는 애플리케이션",
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
