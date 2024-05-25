import { Box, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material";

export default function TokenPanel() {
  return <div className="flex flex-col gap-4 p-4">
    <Typography variant="h6">
      Configure your Token Details
    </Typography>
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input id="description" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="external_url">External URL</InputLabel>
          <Input id="external_url" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="tokenSupply">Token Supply</InputLabel>
          <Input id="tokenSupply" aria-describedby="my-helper-text" type="number"/>
        </FormControl>
      </Box>
      
    </Box>
  </div>
}