import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const PageNotFoundPage = () => {

  const nav = useNavigate()

  return(
    <>
    page not found
      Back to  <Button variant="text" onClick={()=>nav("/")}>Home</Button>

    </>
  )
}