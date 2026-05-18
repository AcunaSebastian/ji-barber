import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";

const antonSans = Anton({
  variable: "--font-geist-sans",
  weight: "400",
  subsets: ["latin"],
});

const antonMono = Anton({
  variable: "--font-geist-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JI Barber Studio · Cortes que imponen",
  description: "JI Barber Studio Company — Barbería de autor. Cortes, barba, diseño y ritual completo. Reserva tu turno.,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${antonSans.variable} ${antonMono.variable} h-full antialiased`}
    >
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
      {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" /> */}
      {/* <link rel="icon" href="assets/logo.jpg" /> */}
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
