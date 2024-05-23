import { Box, Grid, Typography } from "@mui/material";
import MediaUploadPanel from "./MediaUploadPanel";

export default function ModelPanel() {
  return <div className="flex flex-col gap-4">
    <Typography variant="h6">
      Upload your Avatar image. You can choose locked and unlocked NFTs
    </Typography>
    <Box>
      <Typography variant="subtitle1">
        Standard Avatar and Background
      </Typography>
      <Typography variant="caption">
        Customers will interact with your NFT to learn about your brand. Use readyplayer.me to create an avatar and upload a background. Standard Avatars are visible to all users.
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <MediaUploadPanel name="Upload Avatar" accepts=".glb" />
        </Grid>
        <Grid item xs={6}>
          <MediaUploadPanel name="Upload Background" accepts=".jpeg,.png" />
        </Grid>
      </Grid>
    </Box>
    <Box>
      <Typography variant="subtitle1">
        Token-Gated Avatar and Background
      </Typography>
      <Typography variant="caption">
        Customers holding the NFTs can unlock new experiences by connecting their wallets and unlocking their content. Upload special Avatars and backgrounds for users to unlock.
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <MediaUploadPanel name="Upload Avatar" accepts=".glb" />
        </Grid>
        <Grid item xs={6}>
          <MediaUploadPanel name="Upload Background" accepts=".jpeg,.png" />
        </Grid>
      </Grid>
    </Box>
  </div>;
}