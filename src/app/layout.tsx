import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPT saju",
  description: "GPT 오픈AI API를 활용한 사주팔자풀이 앱",
  icons: {
    icon: "/favicon.png", // public 폴더에 있는 경우
    shortcut: "/favicon.png", // 과거 브라우저 호환용
    apple: "/favifon.png" // iOS 홈화면용
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        {children}
      </body>
    </html>
  );
}
