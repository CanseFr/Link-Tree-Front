import {Button, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setRoleOnLogin} from "../../features/authentication/auth-slice.ts";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {login} from "./request.ts";
import {LoginObject} from "./type.ts";

export const Login = () => {
  const [loginObject, setLoginObject] = useState<LoginObject>();

  const nav = useNavigate()
  const dispatch = useDispatch();


  const handleLogin = () => {
    login(loginObject!)
      .then((data) => {
        dispatch(setRoleOnLogin(data.accessToken))
        data.accessToken && nav("/");
      })
      .catch((error) => {
        console.log("Alert login");
        console.error(error);
      });
  }

  return (
    <Grid container bgcolor="white" flexDirection="column" padding={10} width="50%" margin="auto" alignContent="center" borderRadius="8px">
      <LoginIcon fontSize="large" sx={{color: "black", margin: "auto", marginBottom: "20px"}}/>
      <TextField id="outlined-basic" onChange={(e) => setLoginObject({...loginObject, email: e.target.value})} label="Email" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" onChange={(e) => setLoginObject({...loginObject, password: e.target.value})} label="Password" type="password" variant="outlined" sx={{marginTop: "20px"}}/>
      <Button variant="contained" onClick={handleLogin} sx={{backgroundColor: "black", marginTop: "20px"}}>Login</Button>
      <Button variant="text" size="small" onClick={() => nav("/register")} sx={{marginTop: "20px", color: "black"}}>Register</Button>
      <Button variant="text" size="small" onClick={() => nav("/")} sx={{marginTop: "20px", color: "black"}}><KeyboardBackspaceIcon/></Button>
    </Grid>
  )
}