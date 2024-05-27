import NFTProvider from '@/lib/context/NFTProvider';
import NFTCreator from './pages/NFTCreator';
import Web3ModalProvider from './context/Web3ModalProvider';
import { cookieToInitialState } from 'wagmi';
import { config } from './lib/config';
import { headers } from 'next/headers';

export default function App() {

  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <Web3ModalProvider initialState={initialState}>
      <NFTProvider>
        <NFTCreator />
      </NFTProvider>
    </Web3ModalProvider>
  )
}