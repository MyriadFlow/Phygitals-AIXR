import { Client, create } from '@web3-storage/w3up-client'
import { useState } from 'react'
import * as Delegation from '@ucanto/core/delegation';
import { BlobLike } from '@web3-storage/w3up-client/types';

export default function useWeb3Storage() {
  const [account, setAccount] = useState<Client>();
  const [lastDelegation, setLastDelegation] = useState(0);

  async function getDelegation() {
    if (lastDelegation > 0 && Date.now() < lastDelegation) {
      console.log('already delegated');
      return account; 
    }
    const acc = await create();
    setAccount(acc);
    const apiUrl = `/storage`;
    const response = await fetch(apiUrl, {
      body: JSON.stringify({did: acc.agent.did()}),
      method: 'POST',
    });

    const data = await response.arrayBuffer()
    
    const del = await Delegation.extract(new Uint8Array(data));

    if (!del.ok) {
      console.log(del);
      console.log('failed to retrieve delegation!');
    }
    else {
      const space = await acc.addSpace(del.ok);
      acc.setCurrentSpace(space.did());
      console.log('delegation success!');
    }
    setLastDelegation(Date.now() + 3 * 60 * 1000); // 3 minutes

    return acc;
  }

  async function uploadFile(file:BlobLike) {
    const acc = await getDelegation();
    console.log('uploading file', acc);
    const result = acc?.uploadFile(file);
    return result;
  }

  return { account, uploadFile };
}