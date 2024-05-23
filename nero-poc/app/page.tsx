"use client"
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import ModelPanel from '@/components/model/ModelPanel';
import MetadataPanel from '@/components/metadata/MetadataPanel';
import KnowledgePanel from '@/components/knowledge/KnowledgePanel';
import RAGPanel from '@/components/rag/RAGPanel';
import NFTProvider from '@/lib/context/NFTProvider';

export default function App() {

  const [step, setStep] = useState(0);

  const component = useMemo(() => {
    if (step === 0) {
      return <ModelPanel />
    }
    else if (step === 1) {
      return <MetadataPanel />
    }
    else if (step === 2) {
      return <KnowledgePanel />
    }
    else if (step === 3) {
      return <RAGPanel />
    }
  }, [step]);

  return (
    <NFTProvider>
      <Container maxWidth="lg">
        <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
          <Typography variant='h3' component='h2'>Mint NERO Promotional NFT</Typography>
          <Stepper nonLinear activeStep={step}>
            <Step completed={false}>
              <StepButton color="inherit">Model and Background</StepButton>
            </Step>
            <Step completed={false}>
              <StepButton color="inherit">Metadata Traits</StepButton>
            </Step>
            <Step completed={false}>
              <StepButton color="inherit">GPT Knowledge base</StepButton>
            </Step>
            <Step completed={false}>
              <StepButton color="inherit">RAG Datasource</StepButton>
            </Step>
            <Step completed={false}>
              <StepButton color="inherit">Review</StepButton>
            </Step>
          </Stepper>
          {/* {imageFile?.length > 0 && imageFile.indexOf('image') >= 0 && <img src={imageFile} alt="metadata" />}
      {imageFile?.length > 0 && imageFile.indexOf('video') >= 0 && <video src={imageFile} controls />}

      <Button variant='contained' onClick={checkAuth}>Sign With Eth</Button>
      <input type='file' name='upload avatar' onChange={e => getBase64(e.target.files![0])} /> */}
          <Paper className='p-8'>
            {component}
          </Paper>
        </Box>
      </Container>
    </NFTProvider>
  )
}