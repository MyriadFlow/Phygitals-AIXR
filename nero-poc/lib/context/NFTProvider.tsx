import React, { useState } from 'react';
import NFTContext from './NFTContext';
import useLitLibrary from '../hooks/useLitLibrary';

const NFTProvider = ({ children }: any) => {
  const [avatar, setAvatar] = useState<File>();
  const [background, setBackground] = useState<File>();
  const [unlockedAvatar, setUnlockedAvatar] = useState<File>();
  const [unlockedBackground, setUnlockedBackground] = useState<File>();
  const [name, setName] = useState('Shachindra\'s Special Cap');
  const [description, setDescription] = useState('Urban Web3 Club');
  const [traits, setTraits] = useState<{ id: string, trait_type: string, value: string }[]>([
    {id:"1", trait_type: "Material", "value": "Carbon Fiber"},
    {id:"2", trait_type: "Dimensions", "value": "5ft x 2ft"},
    {id:"3", trait_type: "Manufacturer", "value": "Fender"},
    {id:"4", trait_type: "Digital ID", "value": "12345-ABCDE"},
    {id:"5", trait_type: "Storage Location", "value": "ipfs://xyz"},
    {id:"6", trait_type: "Serial Number", "value": "SN1234567890"},
    {id:"7", trait_type: "Product Type", "value": "Guitar"},
    {id:"8", trait_type: "Year of Production", "value": "2023"},
    {id:"9", trait_type: "Weight", "value": "6.5"}
  ]);
  const [externalURL, setExternalURL] = useState<string>("https://urbanweb3.com/shachindra/1");
  const [totalSupply, setTotalSupply] = useState<number>(1000);

  const [publicAgentKnowledge, setPublicAgentKnowledge] = useState<string>(`Lexi, renowned street dancer and fashion designer, had often surveyed her muse high above the city's pulsing heart. Below, a human kaleidoscope mirrored her own passion: cars streamed with the fluidity of a b-boy freeze, pedestrians weaved through the concrete jungle with practiced grace, and the distant thump of bass vibrated like a breaking beat. This urban symphony had always been her lifeblood, fueling "Concrete Rhythm," her thriving clothing brand. From the day she first defied gravity on cracked pavement, the city and her dance had intertwined. Every sharp turn inspired a bold graphic tee, every burst of color whispered the secrets of flowing movement in sweatpants. Now, this latest collection was the culmination of that fusion. It wasn't just clothes – it was a limited edition line of sneakers. Sleek, futuristic kicks built for conquering concrete battlegrounds, each step a statement. They embodied both the agility of Lexi's moves and the city's unwavering spirit. Lexi, the self-made artist who found her rhythm where concrete met movement, was about to unleash her masterpiece.`);
  const [privateAgentKnowledge, setPrivateAgentKnowledge] = useState<string>(`Lexi, renowned street dancer and fashion designer, had often surveyed her muse high above the city's pulsing heart. Below, a human kaleidoscope mirrored her own passion: cars streamed with the fluidity of a b-boy freeze, pedestrians weaved through the concrete jungle with practiced grace, and the distant thump of bass vibrated like a breaking beat. This urban symphony had always been her lifeblood, fueling "Concrete Rhythm," her thriving clothing brand. From the day she first defied gravity on cracked pavement, the city and her dance had intertwined. Every sharp turn inspired a bold graphic tee, every burst of color whispered the secrets of flowing movement in sweatpants. Now, this latest collection was the culmination of that fusion. It wasn't just clothes – it was a limited edition line of sneakers. Sleek, futuristic kicks built for conquering concrete battlegrounds, each step a statement. They embodied both the agility of Lexi's moves and the city's unwavering spirit. Lexi, the self-made artist who found her rhythm where concrete met movement, was about to unleash her masterpiece.`);

  const [tokenPrice, setTokenPrice] = useState(0);

  const {encryptFile, encryptData} = useLitLibrary();

  async function exportMetadata(update: (message:string) => void): Promise<string> {
    // mint an NFT and set to owner
    // encrypt private agent knowledge and unlocked avatar and background using lit
    // upload the metadata into filecoin
    // notify user of success and redirect user?
    
    if (privateAgentKnowledge.length > 0) {
      update('Encrypting Private Agent Knowledge');
      console.log(await encryptData(privateAgentKnowledge));
    }

    if (unlockedAvatar) {
      console.log(await encryptFile(unlockedAvatar))
    }

    if (unlockedBackground) {
       console.log(await (encryptFile(unlockedBackground)))
    }

    // upload encrypted data and non-encrypted data files to filecoin (web3.storage)

    // create metadata object for NFT

    const json = {
      'name': name,
      'description': description,
      'external_url': externalURL,
      'image': '', // ipfs url of the image
      'traits': traits,
      // 'traits': 
      'knowledge': {
        'public': publicAgentKnowledge,
        'private': privateAgentKnowledge
      }
    };


    return "";
  }

  function stepValid(step: number): boolean {
    if (step === 0) {
      return name.length > 0 && description.length > 0 && totalSupply > 0;
    }
    if (step === 1) {
      return avatar != null && background != null;
    }
    if (step === 2) {
      return true;
    }
    if (step === 3) {
      return publicAgentKnowledge.length > 0;
    }
    return false;
  }

  return (
    <NFTContext.Provider value={{
      name, setName,
      description, setDescription,
      totalSupply, setTotalSupply,
      avatar, setAvatar,
      background, setBackground,
      unlockedAvatar, setUnlockedAvatar,
      unlockedBackground, setUnlockedBackground,
      traits, setTraits,
      publicAgentKnowledge, setPublicAgentKnowledge,
      privateAgentKnowledge, setPrivateAgentKnowledge,
      externalURL, setExternalURL,
      exportMetadata,
      stepValid,
      tokenPrice,
      setTokenPrice,
    }}>
      {children}
    </NFTContext.Provider>
  );
};

export default NFTProvider;