import { Box, Typography } from "@mui/material";
import TokenPanel from "../token/TokenPanel";
import ModelPanel from "../model/ModelPanel";
import KnowledgePanel from "../knowledge/KnowledgePanel";
import MetadataPanel from "../metadata/MetadataPanel";
import { useState } from "react";

export default function ReviewPanel() {
  const [message, setMessage] = useState("");

  
  return <div className="flex flex-col gap-4 p-4">
    <Typography variant="h6">
      Review Before Minting!
    </Typography>
    <Typography>
      Click MINT to begin the minting process; this will create data about the NFT on Filecoin, mint the NFT, encrypt the data using LitProtocol, and update the details of the metadata in your NFT
    </Typography>
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <TokenPanel/>
      <ModelPanel/>
      <MetadataPanel/>
      <KnowledgePanel/>
    </Box>
  </div>
}