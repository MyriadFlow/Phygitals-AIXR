import NFTContext from "@/lib/context/NFTContext";
import { Box, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material";
import { useContext } from "react";

export default function TokenPanel() {
  const context = useContext(NFTContext);
  return <div className="flex flex-col gap-4 p-4">
    <Typography variant="h6">
      Configure your Token Details
    </Typography>
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" aria-describedby="my-helper-text" value={context.name} onChange={e=>context.setName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input id="description" aria-describedby="my-helper-text" value={context.description} onChange={e=>context.setDescription(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="external_url">External URL</InputLabel>
          <Input id="external_url" aria-describedby="my-helper-text" value={context.externalURL}  onChange={e=>context.setExternalURL(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="tokenSupply">Token Supply</InputLabel>
          <Input id="tokenSupply" aria-describedby="my-helper-text" type="number" value={context.totalSupply}  onChange={e=>context.setTotalSupply(Math.round(+e.target.value))}/>
        </FormControl>
      </Box>
      
    </Box>
  </div>
}