import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import Footer from "./Footer"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learning Simplified",
  description: "Edtech project by c14-35-n-java-react team.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="flex flex-col max-w-5xl min-h-screen px-6 mx-auto mb-8" >
          <NavBar />
          <main className="h-full mt-4">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
