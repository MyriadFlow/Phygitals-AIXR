"use client"
import NFTProvider from '@/lib/context/NFTProvider';
import NFTCreator from './pages/NFTCreator';

export default function App() {

  return (
    <NFTProvider>
      <NFTCreator />
    </NFTProvider>
  )
}