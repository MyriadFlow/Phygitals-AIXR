import { Box, FormControl, Grid, Input, InputLabel, Typography } from "@mui/material";

export default function MetadataPanel() {
  return <div className="flex flex-col gap-4 p-4">
    <Typography variant="h6">
      Configure your NFT Metadata
    </Typography>
    <Box gap={3} display={"flex"} sx={{ flexDirection: "column" }}>
      <Typography variant="subtitle1">
        Traits
      </Typography>
      <FormControl>
        <InputLabel htmlFor="materials">Material</InputLabel>
        <Input id="materials" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="dimensions">Dimensions</InputLabel>
        <Input id="dimensions" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="manufacturer">Manufacturer</InputLabel>
        <Input id="manufacturer" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="digital_id">Digital ID</InputLabel>
        <Input id="digital_id" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="storage_location">Storage Location</InputLabel>
        <Input id="storage_location" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="serial_number">Serial Number</InputLabel>
        <Input id="serial_number" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="product_type">Product Type</InputLabel>
        <Input id="product_type" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="year_of_production">Year of Production</InputLabel>
        <Input id="year_of_production" aria-describedby="my-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="weight">Weight</InputLabel>
        <Input id="weight" aria-describedby="my-helper-text" />

      </FormControl>
    </Box>
  </div>
}