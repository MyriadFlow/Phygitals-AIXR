import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Phygitals | Landing Page',
  description: 'Landing Page UI for Phygitals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar /> 
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}