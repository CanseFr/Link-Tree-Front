import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {arrayTitleOfBlock, ArrayTitleOfBlockType} from "./data-const.ts";
import {useNavigate} from "react-router-dom";

export const AdminDashboard = () => {

  const nav = useNavigate();

  const formatTitleForUrlPath = (title: ArrayTitleOfBlockType) => {
    return title.titleOne.charAt(0).toLowerCase().concat(title.titleOne.slice(1, title.titleOne.length))
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" mt={10}>
      <Typography variant="h3" fontWeight={800} color="white">ADMINISTRATION</Typography>
      <Grid container justifyContent="space-around">

        {arrayTitleOfBlock.map((b) => (
          <Card sx={
            {
              transition: "1s", minWidth: 500, maxWidth: 500, mt: 10, backgroundColor: 'white',
              "&:hover": {transition: "1s", backgroundColor: "rgb(224,224,224)"}
            }
          }>
            <CardContent>
              <Typography sx={{fontSize: 14}} color="black" gutterBottom>
                {b.titleOne}
              </Typography>
              <Typography variant="h5" color="black" component="div">
                {b.titleTwo}
              </Typography>
              <Typography sx={{mb: 1.5}} color="black" variant="body2">
                {b.desc}
              </Typography>
            </CardContent>
            <CardMedia component="img" height="200" width="200" image={b.imgPath} alt="Paella dish"
                       sx={{
                         transition: "1s",
                         "&:hover": {
                           filter: "blur(4px)",
                           transition: "1s"
                         }
                       }}
            />
            <CardActions>
              <Button sx={{color: "black"}} onClick={() => nav(formatTitleForUrlPath(b))} size="small">{b.btn}</Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}