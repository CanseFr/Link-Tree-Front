import {Button, Card, CardMedia, Grid} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

export const AvatarFieldsModify = () => {
  return (
    <Grid item>
      <Card>
        {/*MARCHE PAS :/, TROUVER UNE SOLUTION*/}
        <CardMedia
          component="img"
          height="200"
          width="200"
          image="src/assets/home_section_2.jpg"
          alt="Paella dish"
        />
      </Card>
      {/* TODO: Implementer picture*/}
      <Grid display="flex" justifyContent="right">
        <Button sx={{backgroundColor: "black"}} variant="contained">
          <CreateIcon/>
        </Button>
      </Grid>
    </Grid>
  )
}