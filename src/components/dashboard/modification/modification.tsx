import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {useEffect, useState} from "react";
import {getOwnerInfos} from "./request.ts";
import {Button, Card, CardMedia, Grid, Typography} from "@mui/material";
import {PathType} from "../../common/types.ts";
import {formatUrlToTitle} from "./format-text.ts";
import CreateIcon from '@mui/icons-material/Create';
import {MuiColorInput} from "mui-color-input";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {genericFetchWithBody} from "../../../common/request/request.ts";

export const Modification = () => {

  const userId = useSelector((state: RootState) => state.authentication.userId)
  const [fulllUserInfo, setFulllUserInfo] = useState<PathType>();

  const [modifyBgColor, setModifyBgColor] = useState<boolean>(false)

  const handleModifyBgColor = (newValue: string) => {
    setFulllUserInfo(prevState => {
      if (prevState) {
        return {
          ...prevState,
          bgColor: newValue,
        };
      }
    });
  };

  const handleValidateModification = () => {
    genericFetchWithBody<PathType>('/path-profil/' + userId, "PATCH", fulllUserInfo!)
      .then((d) => console.log(d))
      .catch((e) => console.log(e))

  }

  const handleRefreshPage = () => {
    getOwnerInfos(userId!)
      .then(setFulllUserInfo)
      .catch((error) => {
        console.log("Error get owner info");
        console.error(error);
      });
  }


  useEffect(() => {
    handleRefreshPage()
  }, [userId]);

  return (
    <>
      <Typography variant="h4" fontWeight={800} component="div" mt={10} mb={10} textAlign="center">
        Voici votre Tree actuel :
      </Typography>
      {modifyBgColor && (
        <Grid display="flex" flexDirection="row" justifyContent="center" sx={{transition: "0.3", backgroundColor: "white", width: "80%", margin: "auto", borderRadius: "8px", padding: 2}}>
          <MuiColorInput format="hex" value={fulllUserInfo!.bgColor} onChange={handleModifyBgColor}/>
          <Button onClick={handleValidateModification}>
            <DoneIcon/>
          </Button>
          <Button onClick={handleRefreshPage}>
            <CloseIcon/>
          </Button>
        </Grid>
      )}
      <br/>
      <Grid sx={{backgroundColor: `${fulllUserInfo?.bgColor}`, borderRadius: "8px", padding: 10, width: "80%", margin: "auto"}}>
        <Grid display="flex" justifyContent="right">
          <Button sx={{backgroundColor: "black"}} onClick={() => setModifyBgColor(!modifyBgColor)} variant="contained">
            <CreateIcon/>
          </Button>
        </Grid>
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
              <Grid item mt={3} key={b.id}>
                <Button sx={{backgroundColor: "black"}} variant="contained" href={b.url_network} target="_blank">{b.name_network}</Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}