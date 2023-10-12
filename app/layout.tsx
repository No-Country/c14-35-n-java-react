import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-w-7xl mx-auto px-6" data-theme="light">
      <body className={inter.className}>
        <NavBar />
        <main className="mt-8">{children}</main>
      </body>
    </html>
  );
}