import Navigation from "@/components/Navigation";
import TopNavigation from "@/components/TopNavigation";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

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
        url: "https://haeya-sunit.vercel.app/sun.png",
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
    images: ["https://haeya-sunit.vercel.app/sun.png"],
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
    icon: "https://haeya-sunit.vercel.app/sun.png",
    apple: "https://haeya-sunit.vercel.app/sun.png",
  },
};

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable}`}
    >
      <body className="font-pretendard antialiased">
        <Providers>
          <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
            <div className="lg:w-64 h-full mt-[63.3px]">
              <Navigation />
            </div>
            <div className="flex-1 flex flex-col h-full">
              <TopNavigation />
              <main className="flex-1 overflow-y-auto lg:pt-16">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
