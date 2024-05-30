"use client"
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import ModelPanel from '@/components/model/ModelPanel';
import MetadataPanel from '@/components/metadata/MetadataPanel';
import KnowledgePanel from '@/components/knowledge/KnowledgePanel';
import ConnectNextButton from '@/components/connect/ConnectNextButton';
import TokenPanel from '@/components/token/TokenPanel';
import NFTContext from '@/lib/context/NFTContext';
import ReviewPanel from '@/components/review/Review';
import useLitLibrary from '@/lib/hooks/useLitLibrary';

export default function NFTCreator() {
  const [step, setStep] = useState(0);
  const context = useContext(NFTContext);

  const [minting, setMinting] = useState(false);
  const [message, setMessage] = useState('');

  const [contractAddress, setContractAddress] = useState('');

  const {testEnc} = useLitLibrary();

  function appendMessage(msg: string) {
    console.log(msg);
    setMessage((prev) => prev + '\n' + msg);
  }

  async function mintNFT() {
    setMessage(() => '');
    setMinting(true);
    const result = await context.exportMetadata(appendMessage);
    setContractAddress(result);
    setMinting(false);
  }

  const component = useMemo(() => {
    if (step === 0) {
      return <TokenPanel />
    }
    else if (step === 1) {
      return <ModelPanel />
    }
    else if (step === 2) {
      return <MetadataPanel />
    }
    else if (step === 3) {
      return <KnowledgePanel />
    }
    else if (step === 4) {
      return <ReviewPanel />
    }
  }, [step]);

  console.log('refresh')

  return <Container maxWidth="lg">
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <Typography variant='h3' component='h2'>Mint NERO Promotional NFT</Typography>
      <Stepper nonLinear activeStep={step}>
        <Step completed={false}>
          <StepButton color="inherit">Token Details</StepButton>
        </Step>
        <Step completed={false}>
          <StepButton color="inherit">Model and Background</StepButton>
        </Step>
        <Step completed={false}>
          <StepButton color="inherit">Metadata Traits</StepButton>
        </Step>
        <Step completed={false}>
          <StepButton color="inherit">Avatar Knowledge base</StepButton>
        </Step>
        {/* <Step completed={false}>
        <StepButton color="inherit">RAG Datasource</StepButton>
      </Step> */}
        <Step completed={false}>
          <StepButton color="inherit">Review</StepButton>
        </Step>
      </Stepper>
      {/* {imageFile?.length > 0 && imageFile.indexOf('image') >= 0 && <img src={imageFile} alt="metadata" />}
{imageFile?.length > 0 && imageFile.indexOf('video') >= 0 && <video src={imageFile} controls />}

<Button variant='contained' onClick={checkAuth}>Sign With Eth</Button>
<input type='file' name='upload avatar' onChange={e => getBase64(e.target.files![0])} /> */}

      <div className='flex flex-row gap-2 justify-items-end'>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
        {step < 4 && <ConnectNextButton disabled={!context.stepValid(step)} onClick={() => { setStep(step + 1) }} />}
        {step === 4 && contractAddress.length === 0 && <Button variant='contained' color='error' disabled={!context.stepsValid() || minting} onClick={mintNFT}>{minting ? "Minting ..." : "Mint NFT"}</Button>}
        {step === 4 && contractAddress.length > 0 && <Button variant='contained' color='success' disabled={!context.stepsValid() || minting} onClick={() => window.open('https://sepolia.etherscan.io/address/' + contractAddress)}>View on Etherscan</Button>}
        {step === 4 && contractAddress.length > 0 && <Button color='success' disabled={!context.stepsValid() || minting} onClick={() => window.open('/viewer/' + contractAddress)}>View NFT</Button>}
        <Button color='success' onClick={() => testEnc()}>Test</Button>
        <div className='flex-1'><w3m-button/></div>

      </div>
      {step === 4 && <Typography variant='h6'>Log Messages from Minting</Typography>}
      {step === 4 && <textarea value={message} readOnly rows={8} className='border border-red-100'/>}
      
      <Paper className='p-8'>
        {component}
      </Paper>
    </Box>
  </Container>
}