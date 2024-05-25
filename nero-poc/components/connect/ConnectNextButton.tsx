import useLitLibrary from "@/lib/hooks/useLitLibrary";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

type ConnectNextButtonProps = {
  onClick: () => void,
  disabled: boolean,
}

export default function ConnectNextButton(props: ConnectNextButtonProps) {
  const [connected, setConnected] = useState(false);
  const { connect } = useLitLibrary();
  const [loading, setLoading] = useState(false);

  const handleButtonClicked = () => {
    setLoading(() => true);
    console.log('set loading')
    if (!connected) {
      connect().then(() => {
        setConnected(true);
        setLoading(() => false);
      })
    }
    else {
      props.onClick();
      setLoading(() => false);
    }
    
  }

  console.log(loading);

  return <Button variant='contained' onClick={handleButtonClicked} disabled={connected && (props.disabled || loading)}>{loading && <CircularProgress size="1rem" className="text-white"/>}{connected?'Next': 'Sign In'}</Button>
}