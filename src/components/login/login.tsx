import {Button, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import {useState} from "react";
import {genericFetch} from "../../common/request/request.ts";

interface LoginObject {
  email: string;
  password: string
}

export const Login = () => {
  const [loginObject, setLoginObject] = useState<LoginObject>({email: '', password: ''});

  const nav = useNavigate()

  const handleLogin = () => {
    genericFetch<LoginObject>("/auth/login", 'POST', loginObject)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error request");
        }
      })
      .then((data) => {
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
    </Grid>
  )
}