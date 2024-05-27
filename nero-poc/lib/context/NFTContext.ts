import React, { createContext } from 'react';

export type NFTContextType = {
  // general nft attributes
  name: string, setName: React.Dispatch<React.SetStateAction<string>>,
  symbol: string, setSymbol: React.Dispatch<React.SetStateAction<string>>,
  description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
  externalURL: string, setExternalURL: React.Dispatch<React.SetStateAction<string>>,
  totalSupply: number, setTotalSupply: React.Dispatch<React.SetStateAction<number>>,
  // model and backgrounds
  avatar: File | undefined, setAvatar: React.Dispatch<React.SetStateAction<File | undefined>>,
  background: File | undefined, setBackground: React.Dispatch<React.SetStateAction<File | undefined>>,
  unlockedAvatar: File | undefined, setUnlockedAvatar: React.Dispatch<React.SetStateAction<File | undefined>>,
  unlockedBackground: File | undefined, setUnlockedBackground: React.Dispatch<React.SetStateAction<File | undefined>>,

  // avatar knowledge base
  publicAgentKnowledge: string, setPublicAgentKnowledge: React.Dispatch<React.SetStateAction<string>>,
  privateAgentKnowledge: string, setPrivateAgentKnowledge: React.Dispatch<React.SetStateAction<string>>,

  //traits
  traits: { id: string, trait_type: string, value: string }[], setTraits: React.Dispatch<React.SetStateAction<{ id: string, trait_type: string, value: string }[]>>,
  tokenPrice: number, setTokenPrice: React.Dispatch<React.SetStateAction<number>>,
  
  bronzeLevel: number, setBronzeLevel: React.Dispatch<React.SetStateAction<number>>,
  silverLevel: number, setSilverLevel: React.Dispatch<React.SetStateAction<number>>,
  goldLevel: number, setGoldLevel: React.Dispatch<React.SetStateAction<number>>,

  backgroundURI: string, setBackgroundURI: React.Dispatch<React.SetStateAction<string>>,
  lockedBackgroundURI: string, setLockedBackgroundURI: React.Dispatch<React.SetStateAction<string>>,

  avatarURI: string, setAvatarURI: React.Dispatch<React.SetStateAction<string>>,
  lockedAvatarURI: string, setLockedAvatarURI: React.Dispatch<React.SetStateAction<string>>,

  publicKnowledgeURI: string, setPublicKnowlegeURI: React.Dispatch<React.SetStateAction<string>>,
  privateKnowledgeURI: string, setPrivateKnowledgeURI: React.Dispatch<React.SetStateAction<string>>,

  metadataURI: string, setMetadataURI: React.Dispatch<React.SetStateAction<string>>;

  // export metadata
  exportMetadata: (update: (message:string) => void) => Promise<string>,
  stepValid: (step:number) => boolean,
  stepsValid: () => boolean,

}

const NFTContext = createContext({} as NFTContextType);

export default NFTContext;