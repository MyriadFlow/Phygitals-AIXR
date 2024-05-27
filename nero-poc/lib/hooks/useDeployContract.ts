import { useState } from "react";
import nero from "../artifacts/contracts/Nero.sol/Nero.json";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { Hex } from "viem";
export default function useDeployContract() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  // const context = useContext(NFTContext);
  const { data: walletClient } = useWalletClient({ chainId });

  const [tokenAddress, setTokenAddress] = useState<Hex | undefined>();

  async function deploy721A(name: string, symbol: string, totalSupply: number, tokenPrice: number, bronzeLevel: number, silverLevel: number, goldLevel: number) {
    console.log(walletClient);
    // verify and then deploy
    // deploy the smart contract using the args
    /*string memory name,
        string memory symbol,
        uint256 supply,
        uint256 price, // price to be paid for nft
        address nero, // our public key so we can auto-update scoreboard
        uint256 bronzeLevel,
        uint256 silverLevel,
        uint256 goldLevel*/

    const addr = await walletClient?.deployContract({
      abi: nero.abi,
      bytecode: nero.bytecode as Hex,
      account: address,
      args: [name, symbol, totalSupply, tokenPrice, '0xb1379D050739dA4457C0c02027251403E805D816', bronzeLevel, silverLevel, goldLevel]
    });

    console.log('deployed!', addr);

    setTokenAddress(addr);

    return addr;
  }

  async function updateContractMetadata(
    avatarURI: string,
    backgroundURI: string,
    lockedAvatarURI: string,
    lockedBackgroundURI :string,
    publicKnowledgeURI: string,
    privateKnowledgeURI: string,
  ) {
    /**
     function updateMetadata(
        string memory _unlockedGlbURI,
        string memory _unlockedBackgroundURI,
        string memory _lockedGlbURI,
        string memory _lockedBackgroundURI,
        string memory _publicKnowlege,
        string memory _privateKnowledge
    )
     */
    const result = await walletClient?.writeContract({
      abi: nero.abi,
      address: tokenAddress!,
      functionName: 'updateMetadata',
      args: [avatarURI, backgroundURI, lockedAvatarURI, lockedBackgroundURI, publicKnowledgeURI, privateKnowledgeURI],
      account: address,
    });

    console.log('updated contract metadata', result);
    return result;
  }

  async function lockSmartContract() {
    const result = await walletClient?.writeContract({
      abi: nero.abi,
      address: tokenAddress!,
      functionName: 'lock',
      account: address,
    });

    console.log('locked contract', result);
    return result;
  }

  return {
    updateContractMetadata, lockSmartContract, deploy721A, tokenAddress
  }
}