import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Early Web3 Radar",
  description: "Discover new web3 projects on Twitter daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
