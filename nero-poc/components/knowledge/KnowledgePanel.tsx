import NFTContext from "@/lib/context/NFTContext";
import { Box, FormControl, Grid, Input, InputLabel, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useContext } from "react";

export default function KnowledgePanel() {
  const context = useContext(NFTContext);

  return <div className="flex flex-col gap-4 p-4">
    <Typography variant="h6">
      Configure the prompt to share with the GPT Agent
    </Typography>
    <Typography variant="body2">
        Hint: this information should tell the user about your product or service and highlight in concise detail what the AI Agent should say while using your avatar.
    </Typography>
    <Typography variant="body2">
        Public Data set is used by the public Avatar users interact with, while the Token-Gated Data set is used by the Avatar when interacting with the tokenholders. The Token-Gated data set merges with the public data set
    </Typography>
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <Typography variant="subtitle1">
        Public Agent Knowledge
      </Typography>
      <FormControl>
        <TextField id="publicGPT" multiline rows={10} placeholder="Enter Agent Knowledge for public avatar" value={context.publicAgentKnowledge} onChange={e=>context.setPublicAgentKnowledge(e.target.value)}/>
      </FormControl>
      <Typography variant="subtitle1">
        Token-Gated Agent Knowledge
      </Typography>
      
      <FormControl>
        <TextField id="privateGPT" multiline rows={10} placeholder="Enter Agent Knowledge for token-gated avatar" value={context.privateAgentKnowledge} onChange={e=>context.setPrivateAgentKnowledge(e.target.value)}/>
      </FormControl>
    </Box>
  </div>
}