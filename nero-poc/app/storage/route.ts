import { CarReader } from '@ipld/car'
import * as DID from '@ipld/dag-ucan/did'
import * as Delegation from '@ucanto/core/delegation'
import * as Signer from '@ucanto/principal/ed25519'
import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
 
async function backend(did: string) {
  // Load client with specific private key
  const principal = Signer.parse(process.env.KEY!)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })
 
  // Add proof that this agent has been delegated capabilities on the space
  const proof = await parseProof(process.env.PROOF!)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
 
  // Create a delegation for a specific DID
  const audience = DID.parse(did)
  const abilities = ['store/add', 'upload/add']
  const expiration = Math.floor(Date.now() / 1000) + (60 * 3) // 3 minutes
  const delegation = await client.createDelegation(audience, abilities, { expiration })
 
  // Serialize the delegation and send it to the client
  const archive = await delegation.archive()
  console.log('delegating access to', did);
  return archive.ok
}
 
/** @param {string} data Base64 encoded CAR file */
async function parseProof(data:any) {
  const blocks:any = []
  const reader = await CarReader.fromBytes(Buffer.from(data, 'base64'))
  for await (const block of reader.blocks()) {
    blocks.push(block)
  }
  return Delegation.importDAG(blocks)
}

export async function POST(request:Request) {
  const body = await request.json();
  const delegation = await backend(body.did);
  // if (!delegation) {
  //   return Response.json({
  //     status: 'error'
  //   })  
  // }
  // return Response.json({
  //   delegation: delegation,
  //   status: delegation ? 'ok' : 'error'
  // })

  return new Response(delegation, {
    status: 200
  })
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // })
 
  // const data = await res.json()
 
  // return Response.json(data)
}