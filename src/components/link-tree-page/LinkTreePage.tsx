import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUrlOwner} from "./request.ts";
import {Button, Card, CardMedia, Grid, Typography} from "@mui/material";

interface BranchsType {
  createdAt: string;
  id: number;
  name_network: string;
  pathId: number;
  updatedAt: string;
  url_network: string;
}

interface PathType {
  id: number;
  createdAt: string;
  updatedAt: string;
  url_owner: string;
  userId: number;
  branchs: BranchsType[];
}

const formatUrlToTitle = (pathUrl: string | undefined) => {
  if (pathUrl) {
    const firstLetterToUpperCase = pathUrl[1].charAt(0).toUpperCase();
    const urlWithOutSlash = pathUrl.split("/")[1]
    const urlWithOutFirstLetter = urlWithOutSlash.slice(1, urlWithOutSlash.length)
    return firstLetterToUpperCase.concat(urlWithOutFirstLetter)
  }
}

export const LinkTreePage = () => {

  const {url_owner} = useParams();
  const [userPath, setUserPath] = useState<PathType>();

  useEffect(() => {
    getUrlOwner(url_owner!)
      .then(setUserPath)
      .catch((error) => {
        console.log("Error get owner info");
        console.error(error);
      });
  }, [url_owner]);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
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
      </Grid>


      <Typography variant="h2" fontWeight={800} component="div">
        {formatUrlToTitle(userPath?.url_owner)}
      </Typography>
      <Grid item>
        La bio de l'utilisateur que je n'ai toujours implementé dans la base de donnée
      </Grid>

      <Grid container direction="column" justifyContent="center" alignItems="center">


        {userPath?.branchs.map((b) =>
          <Grid item mt={3}>
            <Button sx={{backgroundColor: "black"}} variant="contained" href={b.url_network}  target="_blank">{b.name_network}</Button>
          </Grid>
        )
        }
      </Grid>
    </Grid>
  )
}