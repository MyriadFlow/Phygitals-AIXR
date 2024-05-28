import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import NFTProvider from '@/lib/context/NFTProvider';
import { config } from '@/app/lib/config';
import Web3ModalProvider from '@/app/context/Web3ModalProvider';
import NFTViewer from './NFTViewer';
import { Hex } from 'viem';
// import Web3ModalProvider from '@/context/Web3ModalProvider';
// import { config } from '@/lib/config';


// `app/page.tsx` is the UI for the `/` URL
export default function Page({ params }: { params: { slug: string } }) {
  console.log(params);

  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <Web3ModalProvider initialState={initialState}>
      <NFTProvider>
        <NFTViewer address={params.slug[0]! as Hex}/>
      </NFTProvider>
    </Web3ModalProvider>
  )
}