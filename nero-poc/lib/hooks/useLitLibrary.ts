import { useEffect, useMemo, useState } from 'react';
import { checkAndSignAuthMessage } from '@lit-protocol/lit-node-client';
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { AuthSig } from '@lit-protocol/types';

export default function useLitLibrary() {
  const [client, setClient] = useState<LitJsSdk.LitNodeClient>();
  const [authSig, setAuthSig] = useState<AuthSig>();

  function getAccessControlConditions() {
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "0", // 0 ETH, so anyone can open
        },
      },
    ];

    return accessControlConditions;
  }

  async function getLitNodeClient() {
    // Initialize LitNodeClient
    const litNodeClient = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: "cayenne",
    });
    await litNodeClient.connect();
    setClient(litNodeClient);
    return litNodeClient;
  }

  async function encryptData(dataToEncrypt: string) {
    let litNodeClient = client;
    if (!litNodeClient) {
      litNodeClient = await getLitNodeClient();
    }
    const accessControlConditions = getAccessControlConditions();
    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> dataToEncryptHash
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        dataToEncrypt: dataToEncrypt,
        chain: "ethereum",
        authSig
      },
      litNodeClient
    );
    return [ciphertext, dataToEncryptHash];
  }

  async function encryptFile(fileToEncrypt: File) {
    let litNodeClient = client;
    if (!litNodeClient) {
      litNodeClient = await getLitNodeClient();
    }
    const accessControlConditions = getAccessControlConditions();
    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> dataToEncryptHash
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptFile(
      {
        accessControlConditions,
        file: fileToEncrypt,
        chain: "ethereum",
        authSig
      },
      litNodeClient
    );
    return [ciphertext, dataToEncryptHash];
  }

  async function decryptData(
    ciphertext: string,
    dataToEncryptHash: string,
    accessControlConditions: any,
    authSig: AuthSig
  ) {
    const litNodeClient = await getLitNodeClient();

    let decryptedString;
    try {
      decryptedString = await LitJsSdk.decryptToFile(
        {
          authSig,
          accessControlConditions,
          ciphertext,
          dataToEncryptHash,
          chain: "ethereum",
        },
        litNodeClient
      );
    } catch (e) {
      console.log('failed', e);
    }

    return decryptedString;
  }

  const connect = async () => {
    console.log('auth stuff');
    const litNodeClient = await getLitNodeClient();
    const authSig = await checkAndSignAuthMessage({
      chain: "ethereum",
      nonce: await litNodeClient.getLatestBlockhash(),
    });

    // console.log(authSig);
    // const messageToEncrypt = "Victa is awesome";


    // const [ciphertext, dataToEncryptHash] = await encryptFile(messageToEncrypt, litNodeClient, authSig);

    // const decrypted = await decryptData(ciphertext, dataToEncryptHash, getAccessControlConditions2(), authSig);

    // console.log(decrypted);

    // getFile(decrypted!);
    // // getBase64(decrypted)
    setAuthSig(authSig);
  }

  useEffect(() => {
    getLitNodeClient();
  }, []);

  return {
    connect,
    encryptFile,
    encryptData,
    decryptData,
  }

}