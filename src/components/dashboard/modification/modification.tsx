import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {useEffect, useState} from "react";
import {getOwnerInfos} from "./request.ts";
import {Button, Card, CardMedia, Grid, TextField, Typography} from "@mui/material";
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
  const [modifyTxtFields, setModifyTxtFields] = useState<boolean>(false)

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

  const handleCloseTxtFields = () => {
    setModifyTxtFields(false)
    handleRefreshPage()
  }

  const handleCloseColorPicker = () => {
    setModifyBgColor(false)
    handleRefreshPage()
  }

  //  TODO: Optimiser les onchange avec un generic by param

  const handleValidateModification = () => {
    genericFetchWithBody<PathType>('/path-profil/' + userId, "PATCH", fulllUserInfo!)
      .then((d) => console.log(d))
      .catch((e) => console.log(e))

    setModifyBgColor(false)
    setModifyTxtFields(false)
  }

  const handleRefreshPage = () => {
    getOwnerInfos(userId!)
      .then(setFulllUserInfo)
      .catch((error) => {
        console.log("Error get owner info");
        console.error(error);
      });
  }

  const handleBranchChange = (id: number, newValue: string) => {
    setFulllUserInfo((prevState) => {
        if (prevState){
          return {
            ...prevState,
            branchs: prevState.branchs.map((branch) =>
              branch.id === id ? { ...branch, name_network: newValue } : branch
            ),
          };
        }
    });
  };


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
          <Button onClick={handleCloseColorPicker}>
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
            {/* TODO: Implementer picture*/}
            <Grid display="flex" justifyContent="right">
              <Button sx={{backgroundColor: "black"}} variant="contained">
                <CreateIcon/>
              </Button>
            </Grid>
          </Grid>

          {modifyTxtFields ? (
              <Grid>
                {/*User Name Path*/}
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{shrink: true}}
                    label="Url"
                    defaultValue={formatUrlToTitle(fulllUserInfo?.url_owner)}
                    value={formatUrlToTitle(fulllUserInfo?.url_owner)}
                    variant="outlined"
                    onChange={(e) => setFulllUserInfo((prevState) => {
                        if (prevState) {
                          return {
                            ...prevState,
                            url_owner: "/" + e.target.value,
                          };
                        }
                      }
                    )
                    }
                  />
                </Grid>
                <br/>
                {/*Bio*/}
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{shrink: true}}
                    label="Bio"
                    defaultValue={fulllUserInfo?.bio}
                    multiline={true}
                    value={fulllUserInfo?.bio}
                    variant="outlined"
                    onChange={(e) => setFulllUserInfo((prevState) => {
                        if (prevState) {
                          return {
                            ...prevState,
                            bio: e.target.value,
                          };
                        }
                      }
                    )
                    }
                  />
                </Grid>
                <br/>
                {/*Link*/}
                <Grid item>
                  {fulllUserInfo?.branchs.map((link, index) =>
                    <Grid item mt={3} key={link.id}>
                      <TextField
                        id="outlined-basic"
                        InputLabelProps={{shrink: true}}
                        label={`Link ${index + 1}`}
                        value={link.name_network}
                        variant="outlined"
                        // onChange={(e) => setFulllUserInfo((prevState) => {
                        //      if (prevState){
                        //         return {
                        //           ...prevState,
                        //           ...prevState.branchs.map((prevBranchs)=>{
                        //             if (prevBranchs){
                        //               return {
                        //                 ...prevBranchs,
                        //                 name_network: e.target.value
                        //               }
                        //             }
                        //           })
                        //         }
                        //      }
                        //     }
                        //   )
                        // }
                        onChange={(e) => handleBranchChange(link.id, e.target.value)}

                      />
                    </Grid>
                  )}
                </Grid>
                <Grid display="flex" flexDirection="row" justifyContent="center" sx={{transition: "0.3", width: "80%", margin: "auto", borderRadius: "8px", padding: 2}}>
                  <Button onClick={handleValidateModification}>
                    <DoneIcon/>
                  </Button>
                  <Button onClick={handleCloseTxtFields}>
                    <CloseIcon/>
                  </Button>
                </Grid>
              </Grid>


            ) :
            (
              <>
                {/*User Name Path*/}
                <Typography variant="h2" fontWeight={800} component="div">
                  {formatUrlToTitle(fulllUserInfo?.url_owner)}
                </Typography>

                {/*Bio*/}
                <Grid item>
                  {fulllUserInfo?.bio}
                </Grid>

                {/*Link*/}
                <Grid container direction="column" justifyContent="center" alignItems="center">
                  {fulllUserInfo?.branchs.map((b) =>
                    <Grid item mt={3} key={b.id}>
                      <Button sx={{backgroundColor: "black"}} variant="contained" href={b.url_network} target="_blank">{b.name_network}</Button>
                    </Grid>
                  )}
                </Grid>
              </>
            )
          }

        </Grid>

        <Grid display="flex" justifyContent="right">
          <Button sx={{backgroundColor: "black"}} onClick={() => setModifyTxtFields(!modifyTxtFields)} variant="contained">
            <CreateIcon/>
          </Button>
        </Grid>

      </Grid>

    </>
  )
}