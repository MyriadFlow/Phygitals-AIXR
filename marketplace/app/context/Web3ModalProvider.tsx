'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { config } from '../lib/config';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  enableAnalytics: true,
  enableOnramp: true,
});

export default function Web3ModalProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
