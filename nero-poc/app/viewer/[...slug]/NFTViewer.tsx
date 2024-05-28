"use client"
import nero from '@/lib/artifacts/contracts/Nero.sol/Nero.json';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Hex, createPublicClient, decodeEventLog, http } from 'viem';
import { sepolia } from 'viem/chains';
import { useChainId, useReadContracts, useWalletClient } from "wagmi"
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Model = dynamic(
  () => import('./ModelViewer'),
  { ssr: false }
)

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
});


export default function NFTViewer({ address, tokenId }: { address: Hex, tokenId?: number }) {
  const [metadata, setMetadata] = useState<any>()

  const [buying, setBuying] = useState(false);

  const [nftId, setNftId] = useState(-1);
  const [buyStatus, setBuyStatus] = useState({ message: '', status: 0 });
  const [txnHash, setTxnHash] = useState('');

  const chainId = useChainId();
  // const context = useContext(NFTContext);
  const { data: walletClient } = useWalletClient({ chainId });


  const results = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        abi: nero.abi,
        address,
        functionName: 'metadataURI',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'totalSupply',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'maxSupply',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'name',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'symbol',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'lockedGlbURI',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'lockedBackgroundURI',
        chainId: sepolia.id
      },
      {
        abi: nero.abi,
        address,
        functionName: 'pricePerTokenMint',
        chainId: sepolia.id
      },
    ]
  });

  useEffect(() => {
    if (!results.isFetched || !results.data) {
      return;
    }
    if (metadata) {
      return;
    }
    console.log('fetched, lets grab the metadata');

    fetch(results.data[0] as string).then(async (res) => {
      const json = await res.json();
      console.log(json);
      setMetadata(json);
    })
  }, [results]);

  async function buyNow() {
    try {
      setBuyStatus({ message: '', status: 0 });
      setBuying(true);
      const hash = await walletClient?.writeContract({
        abi: nero.abi,
        address,
        functionName: 'mint',
        args: [1],
        value: BigInt(0),
      });
      if (!hash) {
        throw new Error('Failed to execute deploy contract txn');
      }
      console.log('minting ... here is the hash!', hash);
      const txn = await publicClient.waitForTransactionReceipt({ hash });

      console.log('transaction result is', txn, txn.to);
      console.log(txn.logs);
      console.log('purchase success!');

      const topics = decodeEventLog({
        abi: nero.abi,
        ...txn.logs[0]
      });
      console.log(topics);

      if (!topics.args) {
        setBuyStatus({ message: 'Unable to Purchase NFT', status: 400 });
        return;
      }
      setNftId(Number((topics.args as any).tokenId))
      setTxnHash(txn.transactionHash);
      setBuying(false);
      setBuyStatus({ message: `Successfully purchased NFT with ID ${Number((topics.args as any).tokenId)}`, status: 200 });
    }
    catch (e: any) {
      setBuyStatus({ message: 'Unable to Purchase NFT, error was ' + e.message, status: 400 });

    }
    finally {
      setBuying(false);
    }
  }

  const statusMessage = useMemo(() => {
    if (buyStatus.status === 0) {
      return <></>
    }
    if (buyStatus.status === 200) {
      return <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Successfully purchased the NFT {nftId} and should now be in your wallet.
        </Alert>
        <Box gap={3} display={"flex"} sx={{ flexDirection: "row" }}>
          <Button color='success' variant='contained' onClick={() => window.open("https://sepolia.etherscan.io/tx/" + txnHash)}>View on Etherscan</Button>
          <Button color='success' onClick={() => window.open(`/viewer/${address}/${nftId}`)}>View NFT</Button>
        </Box>
      </Box>
    }
    return <Box gap={3} display={"flex"} sx={{ flexDirection: "row" }}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
        We had an issue minting your nft, the error was {buyStatus.message}
      </Alert>
    </Box>
  }, [buyStatus])


  if (!results.isFetched) {
    return <Container maxWidth="lg">
      <Box gap={3} display={"flex"} sx={{ flexDirection: "row" }}>
        <CircularProgress />
        <Typography>Loading</Typography>
      </Box>
    </Container>
  }

  if (!results.data || results.isError) {
    return <Container maxWidth="lg">
      <Box gap={3} display={"flex"} sx={{ flexDirection: "row" }}>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          We were unable to load the NFT, please check the URL and try again
          Error was {results.error?.message}
        </Alert>
      </Box>
    </Container>
  }

  if (tokenId === undefined || isNaN(tokenId)) {

    return <Container maxWidth="lg">
      <w3m-button />
      <Grid container>
        <Grid item xs={6}>
          <Model src={results.data?.[5] as string} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h4'>{results.data?.[3] as string}</Typography>
          <Typography variant='body1'>{metadata && metadata.description}</Typography>
          <Button variant="contained" onClick={buyNow} disabled={buying}>{buying ? "Minting a token!" : "Buy Now"}</Button>
          {statusMessage}
        </Grid>
      </Grid>
    </Container>
  }

  return <></>
}