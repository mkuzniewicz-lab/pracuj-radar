import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pracuj Radar - Inteligentny Asystent Rynku Pracy",
  description: "Analiza rynku pracy napędzana przez AI. Odkryj trendy, wymagania i insights w mgnieniu oka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
