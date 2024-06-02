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
import code from '@/lit-actions/grant-webstorage';
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
    LitJsSdk.disconnectWeb3(); // clear any sessions
    let litNodeClient = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: LitNetwork.Cayenne,
      debug: true
    });

    await litNodeClient.connect();
    let sig = await connect();

    const sessionSigs = await genSession(litNodeClient, [
      {
        resource: new LitActionResource('*'),
        ability: LitAbility.LitActionExecution,
      },
      {
        resource: new LitAccessControlConditionResource('*'),
        ability: LitAbility.AccessControlConditionDecryption,
      }
    ]);
    const accessControlConditions = getAccessControlConditions(contractAddress);

    console.log(args);

    const res = await litNodeClient.executeJs({
      code,
      sessionSigs: sessionSigs, // your session
            jsParams: {
        accessControlConditions,
        sessionSigs,
        authSig: sig,
        ...args
      }
    });

    console.log("Execute JS success", res);

    return res;
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

  const testDecData = async (ciphertext: string, dataToEncryptHash: string, ciphertext2: string, dataToEncryptHash2: string, sessionSigs: any, litNodeClient:any) => {
    const authSig = await checkAndSignAuthMessage({
      chain: "sepolia",
      nonce: await litNodeClient.getLatestBlockhash(),
    });
    console.log(ciphertext2, dataToEncryptHash2);
    const res = await litNodeClient.executeJs({
      sessionSigs,
      code: code,
      jsParams: {
        accessControlConditions: getAccessControlConditions2(),
        ciphertext,
        dataToEncryptHash,
        apiciphertext: ciphertext2,
        apidatatoencrypthash: dataToEncryptHash2,
        sessionSigs,
        authSig,
        chain: "sepolia",
        did: "did:key:z6MkeoofmZ9zdYA7NLNjK5jkDoTSeYe8SHDcn3XJjbRGUp9N"

      }
    })

    console.log("result from action execution: ", res);

    return res.response;
  }

  const requestWeb3Storage = async (did: string) => {
    const api_url_ciphertext = process.env.NEXT_PUBLIC_API_URL_CIPHERTEXT;
    const api_url_datatoencrypthash = process.env.NEXT_PUBLIC_API_URL_DATA_TO_ENCRYPT_HASH;

    const api_key_ciphertext = process.env.NEXT_PUBLIC_API_KEY_CIPHERTEXT;
    const api_key_datatoencrypthash = process.env.NEXT_PUBLIC_API_KEY_DATA_TO_ENCRYPT_HASH;

    const litNodeClient = await getLitNodeClient();

    console.log('starting to request web3 storage credentials through lit actions');

    const authSig = await checkAndSignAuthMessage({
      chain: "sepolia",
      nonce: await litNodeClient.getLatestBlockhash(),
    });

    const sessionSigs = await genSession(litNodeClient, [
      {
        resource: new LitActionResource('*'),
        ability: LitAbility.LitActionExecution,
      },
      {
        resource: new LitAccessControlConditionResource('*'),
        ability: LitAbility.AccessControlConditionDecryption,
      }
    ]);

    console.log('execute js using encrypted api key and url to hide details of where user gets granted information');

    const res = await litNodeClient.executeJs({
      sessionSigs,
      code: code,
      jsParams: {
        accessControlConditions: getAccessControlConditions2(),
        ciphertext: api_url_ciphertext,
        dataToEncryptHash: api_url_datatoencrypthash,
        apiciphertext: api_key_ciphertext,
        apidatatoencrypthash: api_key_datatoencrypthash,
        sessionSigs,
        authSig,
        chain: "sepolia",
        did

      }
    });

    console.log('result is retrieved from the lit action');

    return Buffer.from(res.response.toString(), "base64");
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
    const messageToEncrypt = "12345";
    console.log('encrypting api key');

    const {ciphertext, dataToEncryptHash} = await testEncData(messageToEncrypt, sessionSigs, litNodeClient);

    console.log('api key ciphertext and data to encrypt', ciphertext, dataToEncryptHash);

    console.log('encrypting storage grant api (filecoin)');
    const messageToEncrypt2 = "website";
    const {ciphertext: ct2, dataToEncryptHash: dt2} = await testEncData(messageToEncrypt2, sessionSigs, litNodeClient);

    console.log('url cipertext and data to encrypt', ct2, dt2);

    // try to delegate storage using grant webstorage action

    console.log('cipher done, lets try to get a grant for a did');

    const decrypted = await testDecData(ct2, dt2, ciphertext, dataToEncryptHash, sessionSigs, litNodeClient);
    console.log('decrypted?', decrypted);

    // console.log('ciper done');

    // const decrypted = await decryptData(ciphertext, dataToEncryptHash);

    // console.log(decrypted);


    // const decrypted2 = await testDecData(ciphertext, dataToEncryptHash, sessionSigs, litNodeClient);

    // console.log(decrypted2);

    // // try post without api key
    // const result = await fetch('/storage', {method: 'post', body: JSON.stringify({'did': '123'}), headers: {'x-api-key': 'bob'}})
    // console.log(result);

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
    testEnc,
    requestWeb3Storage,
    disconnect : () => LitJsSdk.disconnectWeb3()
  }

}