import { Paper, Typography } from "@mui/material";
import useUpload from "./useUpload"

type MediaUploadPanelProps = {
  name: string,
  accepts: string,
  fileSelected: (file:File) => void;
  file?: File
}

export default function MediaUploadPanel(props: MediaUploadPanelProps) {
  const { RenderButton, RenderImage } = useUpload(props);

  return <Paper className="w-full flex flex-col gap-2 p-2 text-center">
    <Typography variant={"subtitle2"}>{props.name}</Typography>
    {RenderImage}
    {RenderButton}
  </Paper>
}