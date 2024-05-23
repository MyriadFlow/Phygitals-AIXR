import useLitLibrary from "@/lib/hooks/useLitLibrary";
import { Button, Typography, styled } from "@mui/material";
import { useMemo, useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from "next/image";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type UseUploadProps = {
  accepts: string;
}

export default function useUpload(props: UseUploadProps) {
  const [file, setFile] = useState<any>('');
  const [imageFile, setImageFile] = useState('');
  const [fileType, setFileType] = useState('');
  const [isConnected, setConnected] = useState(false);
  const { connect, decryptData, encryptData, encryptFile } = useLitLibrary();

  function getBase64(file: any) {
    setFileType(file.type);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result?.toString());
      setImageFile(reader.result?.toString()!);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    setFile(file)
  }


  function getFile(raw: any) {

    // var reader = new FileReader();
    // reader.readAsDataURL(new Blob([raw], {}))
    // reader.onload = function () {
    //   console.log(reader.result);
    //   setImageFile(reader.result?.toString()!);
    // };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
    // console.log(new Blob([raw], {type: 'image/jpeg'}));
    // console.log(URL.createObjectURL(new Blob([raw], {type: 'image/jpeg'})));
    console.log(Buffer.from(raw).toString('base64'));
    setImageFile("data:" + fileType + ";base64," + Buffer.from(raw).toString('base64'));
  }

  function renderImage() {
    if (imageFile.length === 0) {
      return <div className="mx-auto w-[300px] h-[300px]">
        <div className="flex justify-center h-[300px]"><CloudUploadIcon fontSize="large" /></div>
      </div>;
    }

    if (imageFile.indexOf('image') >= 0) {
      return <Image src={imageFile} alt="metadata" height={300} width={300} className="mx-auto h-[300px] object-cover" />;
    }

    if (imageFile.indexOf('video') >= 0) {
      return <video src={imageFile} controls />;
    }

    return <div className="h-[300px]"><Typography>{file.name}</Typography></div>
  }

  function renderButton() {
    // if (isConnected)
    //   return <Button variant='contained' onClick={checkAuth}>Sign With Eth</Button>;
    return <div><Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={e => getBase64(e.target.files![0])} accept={props.accepts} />
    </Button></div>
  }

  const RenderButton = renderButton();
  const RenderImage = useMemo(() => {
    return <div className="shadow-md">{renderImage()}</div>
  }, [imageFile]);

  return {
    RenderButton,
    RenderImage,
  }
}