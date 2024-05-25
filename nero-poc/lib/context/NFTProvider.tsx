import React, { useState } from 'react';
import NFTContext from './NFTContext';

const NFTProvider = ({ children }: any) => {
  const [avatar, setAvatar] = useState<File>();
  const [background, setBackground] = useState<File>();
  const [unlockedAvatar, setUnlockedAvatar] = useState<File>();
  const [unlockedBackground, setUnlockedBackground] = useState<File>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [traits, setTraits] = useState<any[]>();

  return (
    <NFTContext.Provider value={{
      avatar, setAvatar,
      background, setBackground,
      unlockedAvatar, setUnlockedAvatar,
      unlockedBackground, setUnlockedBackground,
      name, setName,
      description, setDescription,
      traits, setTraits
    }}>
      {children}
    </NFTContext.Provider>
  );
};

export default NFTProvider;