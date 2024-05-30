import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LitResourceAbilityRequest, generateAuthSig } from "@lit-protocol/auth-helpers";
import { AuthCallbackParams } from "@lit-protocol/types";
import { AuthSig } from '@lit-protocol/types';
import { ethers } from 'ethers';

import {
  createSiweMessageWithRecaps
} from '@lit-protocol/auth-helpers';

export const genSession = async (
  client: LitNodeClient,
  resources: LitResourceAbilityRequest[]) => {
  let sessionSigs = await client.getSessionSigs({
    chain: "sepolia",
    resourceAbilityRequests: resources,
    authNeededCallback: async (params: AuthCallbackParams) => {
      console.log("resourceAbilityRequests:", params.resources);

      if (!params.expiration) {
        throw new Error("expiration is required");
      }

      if (!params.resources) {
        throw new Error("resourceAbilityRequests is required");
      }

      if (!params.uri) {
        throw new Error("uri is required");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum!);
      await provider.send("eth_requestAccounts", []);
      const ethersSigner = provider.getSigner();

      const toSign = await createSiweMessageWithRecaps({
        uri: params.uri,
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        resources: resources,
        walletAddress: await ethersSigner.getAddress(),
        nonce: await client.getLatestBlockhash(),
        litNodeClient: client,
      });

      return await generateAuthSig({
        signer: ethersSigner,
        toSign,
      });

    }
  });

  console.log(sessionSigs);

  return sessionSigs;
}