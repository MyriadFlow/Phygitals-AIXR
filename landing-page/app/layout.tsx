import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nero | Landing Page",
  description: "Landing Page UI for Nero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background-light text-primary-dark`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <section id="contact">
          <Footer />
        </section>
      </body>
    </html>
  );
}
