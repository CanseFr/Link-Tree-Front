import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';

import {useState} from "react";
import {RegisterObject} from "./type.ts";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {register} from "./request.ts";

export const Register = () => {
  const nav = useNavigate()

  const [registerObject, setRegisterObject] = useState<RegisterObject>();

  const handleRegister = () => {
    register(registerObject!)
      .then(() => nav("/")
      )
      .catch((error) => {
        console.log("Alert Register");
        console.error(error);
      });  }

  return (
    <Grid container bgcolor="white" flexDirection="column" padding={10} width="50%" margin="auto" alignContent="center" borderRadius="8px">
      <HowToRegIcon fontSize="large" sx={{color: "black", margin: "auto", marginBottom: "20px"}}/>
      <TextField id="outlined-basic" onChange={(e) => setRegisterObject({...registerObject, firstname: e.target.value})} label="Nom" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" onChange={(e) => setRegisterObject({...registerObject, lastname: e.target.value})} label="Prenom" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" onChange={(e) => setRegisterObject({...registerObject, email: e.target.value})} label="Email" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" onChange={(e) => setRegisterObject({...registerObject, password: e.target.value})} label="Password" type="password" variant="outlined" sx={{marginTop: "20px"}}/>
      <Button variant="contained" onClick={handleRegister} sx={{backgroundColor: "black", marginTop: "20px"}}>Register</Button>
      <Button variant="text" size="small" onClick={() => nav("/login")} sx={{marginTop: "20px", color: "black"}}>Login</Button>
      <Button variant="text" size="small" onClick={() => nav("/")} sx={{marginTop: "20px", color: "black"}}><KeyboardBackspaceIcon/></Button>

    </Grid>
  )
}