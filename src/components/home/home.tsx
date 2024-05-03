import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

export const Home = () => {
  const role = useSelector((state: RootState) => state.authentication.role)
console.log("FROM HOME")
console.log(role)
console.log("FROM HOME")
    return(
    <>
      <Typography variant="body2" color="textSecondary">sssssssss</Typography>
      {role}
    </>
  )
}