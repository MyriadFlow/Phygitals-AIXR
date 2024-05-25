import React, { createContext } from 'react';

export type NFTContextType = {
  avatar: File | undefined, setAvatar: React.Dispatch<React.SetStateAction<File | undefined>>,
  background: File | undefined, setBackground: React.Dispatch<React.SetStateAction<File | undefined>>,
  unlockedAvatar: File | undefined, setUnlockedAvatar: React.Dispatch<React.SetStateAction<File | undefined>>,
  unlockedBackground: File | undefined, setUnlockedBackground: React.Dispatch<React.SetStateAction<File | undefined>>,
  name: string, setName: React.Dispatch<React.SetStateAction<string>>,
  description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
  traits: any[] | undefined, setTraits: React.Dispatch<React.SetStateAction<any[] | undefined>>
}

const NFTContext = createContext({} as NFTContextType);

export default NFTContext;