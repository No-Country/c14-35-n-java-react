import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

import ReduxProvider from "@/redux/provider"

import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Simplified",
  description: "Team c14-35-n-java-react",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="en" data-theme="light">
        <body className={inter.className}>
          <div className="px-6 mx-auto mb-8 max-w-5xl" >
            <NavBar />
            <main className="mt-4">{children}</main>
          </div>
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
