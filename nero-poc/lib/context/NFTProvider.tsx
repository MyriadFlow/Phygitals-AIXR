"use client"
import React, { useState } from 'react';
import NFTContext from './NFTContext';
import useLitLibrary from '../hooks/useLitLibrary';
import useWeb3Storage from '../hooks/useWeb3Storage';
import useDeployContract from '../hooks/useDeployContract';

const NFTProvider = ({ children }: any) => {
  const [avatar, setAvatar] = useState<File>();
  const [background, setBackground] = useState<File>();
  const [unlockedAvatar, setUnlockedAvatar] = useState<File>();
  const [unlockedBackground, setUnlockedBackground] = useState<File>();
  const [name, setName] = useState('Shachindra\'s Special Cap');
  const [symbol, setSymbol] = useState('SSC');
  const [description, setDescription] = useState('Urban Web3 Club');
  const [traits, setTraits] = useState<{ id: string, trait_type: string, value: string }[]>([
    { id: "1", trait_type: "Material", "value": "Carbon Fiber" },
    { id: "2", trait_type: "Dimensions", "value": "5ft x 2ft" },
    { id: "3", trait_type: "Manufacturer", "value": "Fender" },
    { id: "4", trait_type: "Digital ID", "value": "12345-ABCDE" },
    { id: "5", trait_type: "Storage Location", "value": "ipfs://xyz" },
    { id: "6", trait_type: "Serial Number", "value": "SN1234567890" },
    { id: "7", trait_type: "Product Type", "value": "Guitar" },
    { id: "8", trait_type: "Year of Production", "value": "2023" },
    { id: "9", trait_type: "Weight", "value": "6.5" }
  ]);
  const [externalURL, setExternalURL] = useState<string>("https://urbanweb3.com/shachindra/1");
  const [totalSupply, setTotalSupply] = useState<number>(1000);

  const [publicAgentKnowledge, setPublicAgentKnowledge] = useState<string>(`Lexi, renowned street dancer and fashion designer, had often surveyed her muse high above the city's pulsing heart. Below, a human kaleidoscope mirrored her own passion: cars streamed with the fluidity of a b-boy freeze, pedestrians weaved through the concrete jungle with practiced grace, and the distant thump of bass vibrated like a breaking beat. This urban symphony had always been her lifeblood, fueling "Concrete Rhythm," her thriving clothing brand. From the day she first defied gravity on cracked pavement, the city and her dance had intertwined. Every sharp turn inspired a bold graphic tee, every burst of color whispered the secrets of flowing movement in sweatpants. Now, this latest collection was the culmination of that fusion. It wasn't just clothes – it was a limited edition line of sneakers. Sleek, futuristic kicks built for conquering concrete battlegrounds, each step a statement. They embodied both the agility of Lexi's moves and the city's unwavering spirit. Lexi, the self-made artist who found her rhythm where concrete met movement, was about to unleash her masterpiece.`);
  const [privateAgentKnowledge, setPrivateAgentKnowledge] = useState<string>(`Lexi, renowned street dancer and fashion designer, had often surveyed her muse high above the city's pulsing heart. Below, a human kaleidoscope mirrored her own passion: cars streamed with the fluidity of a b-boy freeze, pedestrians weaved through the concrete jungle with practiced grace, and the distant thump of bass vibrated like a breaking beat. This urban symphony had always been her lifeblood, fueling "Concrete Rhythm," her thriving clothing brand. From the day she first defied gravity on cracked pavement, the city and her dance had intertwined. Every sharp turn inspired a bold graphic tee, every burst of color whispered the secrets of flowing movement in sweatpants. Now, this latest collection was the culmination of that fusion. It wasn't just clothes – it was a limited edition line of sneakers. Sleek, futuristic kicks built for conquering concrete battlegrounds, each step a statement. They embodied both the agility of Lexi's moves and the city's unwavering spirit. Lexi, the self-made artist who found her rhythm where concrete met movement, was about to unleash her masterpiece.`);
  const [tokenPrice, setTokenPrice] = useState(0);
  const { encryptFile, encryptData } = useLitLibrary();

  const [bronzeLevel, setBronzeLevel] = useState(10);
  const [silverLevel, setSilverLevel] = useState(100);
  const [goldLevel, setGoldLevel] = useState(200);

  const { account, uploadFile } = useWeb3Storage();

  const [backgroundURI, setBackgroundURI] = useState("");
  const [lockedBackgroundURI, setLockedBackgroundURI] = useState("");

  const [avatarURI, setAvatarURI] = useState("");
  const [lockedAvatarURI, setLockedAvatarURI] = useState("");

  const [publicKnowledgeURI, setPublicKnowlegeURI] = useState("");
  const [privateKnowledgeURI, setPrivateKnowledgeURI] = useState("");

  const [metadataURI, setMetadataURI] = useState("");

  const { deploy721A, lockSmartContract, tokenAddress, updateContractMetadata } = useDeployContract();

  function getLink(CID: string) {
    return `https://${CID}.ipfs.w3s.link`;
  }

  async function uploadBlob(data: string) {
    return getLink((await uploadFile(new Blob([data], { type: 'application/json' })))!.toString());
  }

  async function uploadPrivateData(ciphertext: string, dataToEncryptHash: string) {
    const link = await uploadBlob(JSON.stringify({ ciphertext, dataToEncryptHash }))
    return link
  }

  async function exportMetadata(update: (message: string) => void): Promise<string> {
    // mint an NFT 
    // encrypt private agent knowledge and unlocked avatar and background using lit
    // upload the metadata into filecoin
    // notify user of success and redirect user?

    try {

      update('1. Deploying smart contract ' + name);
      const contractAddress = await deploy721A(name, symbol, totalSupply, tokenPrice, bronzeLevel, silverLevel, goldLevel);
      update(`1.1 Smart contract deployed at ${contractAddress}`);
      update('2. Uploading avatar and background images to IPFS');
      const avatarURI = getLink((await uploadFile(avatar!))!.toString());
      const backgroundURI = getLink((await uploadFile(background!))!.toString());
      setAvatarURI(avatarURI);
      setBackgroundURI(backgroundURI);

      update('2.1 Upload of avatar and background success, uri is avatar:' + avatarURI + ', background:' + backgroundURI);

      // create metadata object for NFT

      const json = {
        'name': name,
        'description': description,
        'external_url': externalURL,
        'image': avatarURI, // ipfs url of the image
        'traits': traits,
        'avatar': {
          'locked': avatarURI,
          'lockedBackground': backgroundURI,
          'unlocked': '',
          'unlockedBackground': '',
        },
        'knowledge': {
          'public': '',
          'private': '',
        }
      };
      // upload encrypted data and non-encrypted data files to filecoin (web3.storage)

      update('3. Checking private encrypted data for knowledge, avatar and background');
      if (privateAgentKnowledge.length > 0) {
        update('3.1.1. Encrypting Private Agent Knowledge');
        const [ciphertext, dataToEncryptHash] = await encryptData(privateAgentKnowledge, contractAddress!);
        json.knowledge.private = await uploadPrivateData(ciphertext, dataToEncryptHash);
        update('3.1.1. Private knowledge encrypted and uploaded to file ' + json.knowledge.private);
      }

      if (unlockedAvatar) {
        update('3.1.2. Encrypting Private Agent Avatar');
        const [ciphertext, dataToEncryptHash] = (await encryptFile(unlockedAvatar, contractAddress!))
        json.avatar.unlocked = await uploadPrivateData(ciphertext, dataToEncryptHash)
        update('3.1.2. Private avatar encrypted and uploaded to file ' + json.avatar.unlocked);
      }

      if (unlockedBackground) {
        update('3.1.3. Encrypting Private Agent Background');
        const [ciphertext, dataToEncryptHash] = (await (encryptFile(unlockedBackground, contractAddress!)))
        json.avatar.unlockedBackground = await uploadPrivateData(ciphertext, dataToEncryptHash)
        update('3.1.3. Private avatar background encrypted and uploaded to file ' + json.avatar.unlockedBackground);
      }

      // upload metadata
      const metadataURI = await uploadBlob(JSON.stringify(json));

      update('4. metadata created ' + metadataURI);

      update('5. updating all uri into smart contract and locking smart contract');


    }
    catch (exception) {
      update('FAILED: error was ' + exception);
      console.error(exception);
    }
    // set and lock contract

    return "";
  }

  function stepValid(step: number): boolean {
    if (step === 0) {
      return name.length > 0 && description.length > 0 && totalSupply > 0 && bronzeLevel > 0 && bronzeLevel < silverLevel && silverLevel < goldLevel;
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

  function stepsValid(): boolean {
    return stepValid(0) && stepValid(1) && stepValid(2) && stepValid(3);
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
      tokenPrice, setTokenPrice,
      bronzeLevel, setBronzeLevel,
      silverLevel, setSilverLevel,
      goldLevel, setGoldLevel,
      symbol, setSymbol,

      avatarURI, setAvatarURI,
      backgroundURI, setBackgroundURI,
      lockedAvatarURI, setLockedAvatarURI,
      lockedBackgroundURI, setLockedBackgroundURI,
      publicKnowledgeURI, setPublicKnowlegeURI,
      privateKnowledgeURI, setPrivateKnowledgeURI,
      metadataURI, setMetadataURI,

      exportMetadata,
      stepValid,
      stepsValid
    }}>
      {children}
    </NFTContext.Provider>
  );
};

export default NFTProvider;