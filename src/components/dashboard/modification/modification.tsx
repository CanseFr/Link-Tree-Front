import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {useEffect, useState} from "react";
import {getOwnerInfos} from "./request.ts";
import {Button, Card, CardMedia, Grid, Typography} from "@mui/material";
import {PathType} from "../../common/types.ts";
import {formatUrlToTitle} from "./format-text.ts";

export const Modification = () => {

  const userId = useSelector((state: RootState) => state.authentication.userId)
  const [fulllUserInfo, setFulllUserInfo] = useState<PathType>();

  useEffect(() => {
    getOwnerInfos(userId!)
      .then(setFulllUserInfo)
      .catch((error) => {
        console.log("Error get owner info");
        console.error(error);
      });
  }, []);

  return (
    <>
      <Typography variant="h4" fontWeight={800} component="div" mt={10} mb={10} textAlign="center">
        Voici votre Tree actuel :
      </Typography>

      <Grid sx={{backgroundColor: `${fulllUserInfo?.bgColor}`, borderRadius: "8px", padding: 10, width: "80%", margin: "auto"}}>
        <Grid mt={10} container direction="column" justifyContent="center" alignItems="center">

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
            {formatUrlToTitle(fulllUserInfo?.url_owner)}
          </Typography>
          <Grid item>
            {fulllUserInfo?.bio}
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="center">


            {fulllUserInfo?.branchs.map((b) =>
              <Grid item mt={3}>
                <Button sx={{backgroundColor: "black"}} variant="contained" href={b.url_network} target="_blank">{b.name_network}</Button>
              </Grid>
            )
            }
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}