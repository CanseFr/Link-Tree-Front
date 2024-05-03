import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';

export const Register = () => {
  const nav = useNavigate()
  return (
    <Grid container bgcolor="white" flexDirection="column" padding={10} width="50%" margin="auto" alignContent="center" borderRadius="8px">
      <HowToRegIcon fontSize="large"  sx={{ color: "black", margin: "auto", marginBottom: "20px" }} />
      <TextField id="outlined-basic" label="Nom" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" label="Prenom" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" label="Email" variant="outlined" sx={{marginTop: "20px"}}/>
      <TextField id="outlined-basic" label="Password" type="password" variant="outlined" sx={{marginTop: "20px"}}/>
      <Button variant="contained" sx={{backgroundColor: "black", marginTop: "20px"}}>Register</Button>
      <Button variant="text" size="small" onClick={()=>nav("/login")} sx={{marginTop: "20px", color: "black"}}>Login</Button>
    </Grid>
  )
}