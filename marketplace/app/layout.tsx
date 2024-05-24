import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from './lib/config';
import Web3ModalProvider from './context/Web3ModalProvider';

export const metadata: Metadata = {
  title: 'Nero | Marketplace',
  description: 'Marketplace UI for Nero',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
        <main className="flex-grow">{children}</main>
        </Web3ModalProvider>
      </body>
    </html>
  );
}