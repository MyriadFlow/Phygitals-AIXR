import { useState } from 'react';
import { checkAndSignAuthMessage } from '@lit-protocol/lit-node-client';
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { AuthSig } from '@lit-protocol/types';
import { LitNetwork } from "@lit-protocol/constants";
import { genSession } from '../lit/session';
import {
  LitActionResource,
  LitAccessControlConditionResource,
  LitAbility,
} from '@lit-protocol/auth-helpers';
import code from '@/lit-actions/unlock-token-content';
export default function useLitLibrary() {
  const [client, setClient] = useState<LitJsSdk.LitNodeClient>();
  const [authSig, setAuthSig] = useState<AuthSig>();

  function getAccessControlConditions(contractAddress: string) {
    const accessControlConditions = [
      {
        contractAddress,
        standardContractType: 'ERC721',
        chain: 'sepolia',
        method: 'balanceOf',
        parameters: [
          ':userAddress'
        ],
        returnValueTest: {
          comparator: '>',
          value: '0'
        }
      }
    ]

    return accessControlConditions;
  }

  function getAccessControlConditions2() {
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "sepolia",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "0", // 0 ETH
        },
      },
    ];

    return accessControlConditions;
  }

  async function executeLitAction(contractAddress: string, code: string, args?: any) {
    let litNodeClient = client;

    if (!litNodeClient) {
      litNodeClient = await getLitNodeClient();
    }


    let sig = authSig;
    if (!sig) {
      sig = await connect();
    }
    const accessControlConditions = getAccessControlConditions(contractAddress);

    console.log(args);

    const res = await litNodeClient.executeJs({
      code,
      sessionSigs: await genSession(litNodeClient, [{
        resource: new LitActionResource('*'),
        ability: LitAbility.LitActionExecution,
      },
      {
        resource: new LitAccessControlConditionResource('*'),
        ability: LitAbility.AccessControlConditionDecryption,
      }]), // your session
      jsParams: {
        accessControlConditions,
        ...args
      }
    });

    console.log("Execute JS success", res);
  }

  async function getLitNodeClient() {
    console.log('get client', client);
    if (client) {
      return client;
    }
    // Initialize LitNodeClient
    // LitJsSdk.disconnectWeb3();
    const litNodeClient = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: LitNetwork.Cayenne,
      debug: true
    });

    await litNodeClient.connect();
    console.log(litNodeClient);
    setClient(litNodeClient);
    return litNodeClient;
  }

  async function encryptData(dataToEncrypt: string, contractAddress?: string) {
    let litNodeClient = client;
    if (!litNodeClient) {
      litNodeClient = await getLitNodeClient();
    }
    let sig = authSig;
    if (!authSig) {
      sig = await connect();
    }
    const accessControlConditions = !contractAddress ? getAccessControlConditions2() : getAccessControlConditions(contractAddress);
    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> dataToEncryptHash
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        dataToEncrypt: dataToEncrypt,
        // chain: "sepolia",
        // authSig: sig
      },
      litNodeClient
    );
    return [ciphertext, dataToEncryptHash];
  }

  async function encryptFile(fileToEncrypt: File, contractAddress?: string) {
    let litNodeClient = client;
    if (!litNodeClient) {
      litNodeClient = await getLitNodeClient();
    }
    let sig = authSig;
    if (!authSig) {
      sig = await connect();
    }
    const accessControlConditions = !contractAddress ? getAccessControlConditions2() : getAccessControlConditions(contractAddress);
    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> dataToEncryptHash
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptFile(
      {
        accessControlConditions,
        file: fileToEncrypt,
        chain: "sepolia",
        authSig: sig
      },
      litNodeClient
    );
    return [ciphertext, dataToEncryptHash];
  }

  async function decryptData(
    ciphertext: string,
    dataToEncryptHash: string,
    contractAddress?: string
  ) {
    const litNodeClient = await getLitNodeClient();
    let sig = authSig;
    if (!authSig) {
      sig = await connect();
    }

    console.log(dataToEncryptHash, contractAddress);

    let decryptedString;
    try {
      decryptedString = await LitJsSdk.decryptToFile(
        {
          authSig: sig,
          accessControlConditions: !contractAddress ? getAccessControlConditions2() : getAccessControlConditions(contractAddress),
          ciphertext,
          dataToEncryptHash,
          chain: "sepolia",
        },
        litNodeClient
      );
    } catch (e) {
      console.error(e);
      console.log('failed', e);
    }

    return decryptedString;
  }

  const testEncData = async (message: string, sessionSigs: any, litNodeClient: any) => {
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions: getAccessControlConditions2(),
        // chain: "sepolia",
        dataToEncrypt: message,
        // sessionSigs,
      },
      litNodeClient,
    );
    return {
      ciphertext,
      dataToEncryptHash,
    };
  }

  const testDecData = async (ciphertext: string, dataToEncryptHash: string, sessionSigs: any, litNodeClient:any) => {
    const authSig = await checkAndSignAuthMessage({
      chain: "sepolia",
      nonce: await litNodeClient.getLatestBlockhash(),
    });
    const res = await litNodeClient.executeJs({
      sessionSigs,
      code: code,
      jsParams: {
        accessControlConditions: getAccessControlConditions('0xa76cebf510409b2e504a47918a345ee3cb78dc23'),
        ciphertext,
        dataToEncryptHash,
        sessionSigs,
        authSig,
        url: "https://bafkreibnpyf4nyoy62ieaw7wqj4ysxcsuy5dw5kuxoxhu2eruofumdf3mq.ipfs.w3s.link"

      }
    })

    console.log("result from action execution: ", res);

    return res.response;
  }

  const testEnc = async () => {
    console.log('testing enc stuff');
    const litNodeClient = await getLitNodeClient();

    const sessionSigs = await genSession(litNodeClient, [
      {
        resource: new LitActionResource('*'),
        ability: LitAbility.LitActionExecution,
      },
      {
        resource: new LitAccessControlConditionResource('*'),
        ability: LitAbility.AccessControlConditionDecryption,
      }
    ])

    // console.log(authSig);
    const messageToEncrypt = "Victa is awesome";


    const {ciphertext, dataToEncryptHash} = await testEncData(messageToEncrypt, sessionSigs, litNodeClient);

    console.log('ciper done');

    const decrypted = await decryptData(ciphertext, dataToEncryptHash);

    console.log(decrypted);


    const decrypted2 = await testDecData(ciphertext, dataToEncryptHash, sessionSigs, litNodeClient);

    console.log(decrypted2);

    // try post without api key
    const result = await fetch('/storage', {method: 'post', body: JSON.stringify({'did': '123'}), headers: {'x-api-key': 'bob'}})
    console.log(result);

    // getFile(decrypted!);
    // // getBase64(decrypted)

    return authSig;
  }

  const connect = async () => {
    console.log('auth stuff');
    const litNodeClient = await getLitNodeClient();

    const authSig = await checkAndSignAuthMessage({
      chain: "sepolia",
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

    return authSig;
  }

  // useEffect(() => {
  //   getLitNodeClient();
  // }, []);

  return {
    connect,
    encryptFile,
    encryptData,
    decryptData,
    executeLitAction,
    testEnc
  }

}