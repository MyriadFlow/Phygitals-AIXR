import React, { useState } from 'react';
import NFTContext from './NFTContext';

const NFTProvider = ({ children }: any) => {
  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');
  const [unlockedAvatar, setUnlockedAvatar] = useState('');
  const [unlockedBackground, setUnlockedBackground] = useState('');
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