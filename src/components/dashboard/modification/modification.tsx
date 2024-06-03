import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {useEffect, useState} from "react";
import {createPathProfile, getOwnerInfos, updateAllBranchs, updatePathProfil} from "./request.ts";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {BranchsPartialType, PathPartialType, PathType} from "../../common/types.ts";
import CreateIcon from '@mui/icons-material/Create';
import {MuiColorInput} from "mui-color-input";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {formatUrlToTitle} from "./format-text.ts";
import {ColorBgModify} from "./components/color-bg-modify.tsx";
import {AvatarFieldsModify} from "./components/avatar-fields-modify.tsx";
import {PathProfilModify} from "./components/path-profil-modify.tsx";
import {BioProfilModify} from "./components/bio-profil-modify.tsx";


// TO Separer dans des composant

export const Modification = () => {

  const userId = useSelector((state: RootState) => state.authentication.userId)
  const [pathWithNestedBranchs, setPathWithNestedBranchs] = useState<PathType>();

  const [modifyBgColor, setModifyBgColor] = useState<boolean>(false)
  const [modifyInfoFields, setModifyInfoFields] = useState<boolean>(false)
  const [modifyLinksFields, setModifyLinksFields] = useState<boolean>(false)

  const [isCreateTree, setIsCreateTree] = useState<boolean>(false)
  const [pathToCreate, setPathToCreate] = useState<string>("")
  const [bioToCreate, setBioToCreate] = useState<string>("")
  const [bgColorToCreate, setBgColorToCreate] = useState<string>("")
  const [branchToCreate, setBranchToCreate] = useState<BranchsPartialType>({url_network: "", name_network: ""})

  const handleCloseInfoFields = () => {
    setModifyInfoFields(false)
    handleRefreshPage()
  }

  const handleCloseLinksFields = () => {
    setModifyLinksFields(false)
    handleRefreshPage()
  }

  const handleCloseColorPicker = () => {
    setModifyBgColor(false)
    handleRefreshPage()
  }

  //

  const handleValidateBg = () => {
    console.log(pathWithNestedBranchs)
    updatePathProfil(pathWithNestedBranchs!.id!, pathWithNestedBranchs!)
      .then((d) => console.log(d))
      .catch((e) => console.log(e))
    setAllToFalse()
  }

  const handleValidateLinks = () => {
    updateAllBranchs(pathWithNestedBranchs!.id!, pathWithNestedBranchs!)
      .then((d) => console.log(d))
      .catch((e) => console.log(e))
    setAllToFalse()
  }

  const handleValidateInfo = () => {
    updatePathProfil(pathWithNestedBranchs!.id!, pathWithNestedBranchs!)
      .then((d) => console.log(d))
      .catch((e) => console.log(e))
    setAllToFalse()
  }

  //

  const setAllToFalse = () => {
    setModifyInfoFields(false)
    setModifyBgColor(false)
    setModifyLinksFields(false)
  }

  const handleRefreshPage = () => {
    getOwnerInfos(userId!)
      .then(setPathWithNestedBranchs)
      .catch((error) => {
        console.log("Error get owner info");
        console.error(error);
      });
  }

  //

  const handleModifyBgColor = (newValue: string) => {
    setPathWithNestedBranchs(prevState => {
      if (prevState) {
        return {
          ...prevState,
          bgColor: newValue,
        };
      }
    });
  };


  const handleBranchChange = (id: number, newValue: string) => {
    setPathWithNestedBranchs((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          branchs: prevState.branchs.map((branch) =>
            branch.id === id ? {...branch, name_network: newValue} : branch
          ),
        };
      }
    });
  };

  const handleCreateBgColor = (newValue: string) => {
    setBgColorToCreate(newValue);
  };

  const handleCreatePath = () => {
    const newPath: PathPartialType = {
      bio: bioToCreate,
      url_owner: "/" + pathToCreate,
      bgColor: bgColorToCreate,
      userId: userId!,
      branchs: [{name_network: branchToCreate.url_network, url_network: branchToCreate.url_network}],
    }
    createPathProfile(newPath).then((res) =>
      console.log(res)
    )
  }


  useEffect(() => {
    handleRefreshPage()
  }, [userId]);

  return (
    <>
      {/*START CREATE PROFIL*/}
      {
        !pathWithNestedBranchs ?
          <Grid textAlign="center">
            <Grid item>
              <Typography variant="h4" fontWeight={800} component="div" mt={10} mb={10} textAlign="center">
                Vous ne possedez pas Tree pour le moment
              </Typography>
            </Grid>
            <Grid item>
              <Button sx={{backgroundColor: "black"}} onClick={() => setIsCreateTree(true)} variant="contained">
                Creer votre Tree
              </Button>
            </Grid>
            <br/>
            {isCreateTree && (
              <Grid>

                <Grid item mb={5}>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{shrink: true}}
                    label="Url"
                    value={pathToCreate}
                    variant="outlined"
                    onChange={(e) => setPathToCreate(e.target.value)}
                  />
                </Grid>

                <Grid item mb={5}>
                  <TextField
                    InputLabelProps={{shrink: true}}
                    label="Votre bio"
                    value={bioToCreate}
                    variant="outlined"
                    onChange={(e) => setBioToCreate(e.target.value)}
                  />
                </Grid>

                <Grid item mb={5}>
                  <Typography>Choisissez une couleur de background</Typography>
                  <MuiColorInput format="hex" value={bgColorToCreate} onChange={handleCreateBgColor}/>
                </Grid>

                <Typography mb={5}>
                  Vos reseaux
                </Typography>

                <Grid item mb={5}>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{shrink: true}}
                    label="Link name"
                    value={branchToCreate?.name_network}
                    variant="outlined"
                    onChange={(e) => setBranchToCreate((prev) => ({
                      ...prev,
                      name_network: e.target.value,
                    }))}
                  />
                </Grid>
                <Grid item mb={5}>
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{shrink: true}}
                    label="Link url"
                    value={branchToCreate?.url_network}
                    variant="outlined"
                    onChange={(e) => setBranchToCreate((prev) => ({
                      ...prev,
                      url_network: e.target.value,
                    }))}/>
                </Grid>

                <Grid display="flex" flexDirection="row" justifyContent="center" sx={{transition: "0.3", width: "80%", margin: "auto", borderRadius: "8px", padding: 2}}>
                  <Button onClick={handleCreatePath}>
                    <DoneIcon/>
                  </Button>
                  <Button onClick={() => setIsCreateTree(false)}>
                    <CloseIcon/>
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
          // END CREATE PROFIL
          :
          // START MODIFY
          <Grid>
            <Typography variant="h4" fontWeight={800} component="div" mt={10} mb={10} textAlign="center">
              Voici votre Tree actuel :
            </Typography>

            {/*  MODIFY BG*/}
            {modifyBgColor && (
              <ColorBgModify pathWithNestedBranchs={pathWithNestedBranchs} handleModifyBgColor={handleModifyBgColor} handleValidateBg={handleValidateBg}
                             handleCloseColorPicker={handleCloseColorPicker}/>
            )}

            <br/>

            <Grid sx={{backgroundColor: `${pathWithNestedBranchs?.bgColor}`, borderRadius: "8px", padding: 10, width: "80%", margin: "auto"}}>
              <Grid display="flex" justifyContent="right">
                <Button sx={{backgroundColor: "black"}} onClick={() => setModifyBgColor(!modifyBgColor)} variant="contained">
                  <CreateIcon/>
                </Button>
              </Grid>
              <Grid mt={10} container direction="column" justifyContent="center" alignItems="center">

                {/*MODIFY AVATAR*/}
                <AvatarFieldsModify/>

                {/*MODIFY INFO FILEDS*/}
                {modifyInfoFields ? (
                  <Grid>

                    {/*Modify Path Profil*/}
                    <PathProfilModify pathWithNestedBranchs={pathWithNestedBranchs} setPathWithNestedBranchs={setPathWithNestedBranchs}/>
                    <br/>

                    {/*Modify Bio*/}
                    <BioProfilModify pathWithNestedBranchs={pathWithNestedBranchs} setPathWithNestedBranchs={setPathWithNestedBranchs}/>
                    <br/>

                    {/*Validation button modify */}
                    <Grid display="flex" flexDirection="row" justifyContent="center" sx={{transition: "0.3", width: "80%", margin: "auto", borderRadius: "8px", padding: 2}}>
                      <Button onClick={handleValidateInfo}>
                        <DoneIcon/>
                      </Button>
                      <Button onClick={handleCloseInfoFields}>
                        <CloseIcon/>
                      </Button>
                    </Grid>

                  </Grid>
                ) : (
                  <Grid>
                    {/*Display Path Profil*/}
                    <Typography variant="h2" fontWeight={800} component="div">
                      {formatUrlToTitle(pathWithNestedBranchs?.url_owner)}
                    </Typography>

                    {/*Display Bio Profil*/}
                    <Grid item>
                      {pathWithNestedBranchs?.bio}
                    </Grid>
                  </Grid>
                )}
              </Grid>
              {/*END MODIFY*/}

              {/*PEN START TO MODIFY LIST NETWORK*/}
              <Grid display="flex" justifyContent="right">
                <Button sx={{backgroundColor: "black"}} onClick={() => setModifyInfoFields(!modifyInfoFields)} variant="contained">
                  <CreateIcon/>
                </Button>
              </Grid>
              {/*PEN START TO MODIFY LIST NETWORK*/}

              {/* LINK START MODIFY */}
              {modifyLinksFields ? (
                  <Grid>
                    <Grid item>
                      {pathWithNestedBranchs?.branchs.map((link, index) =>
                        <Grid item mt={3} key={link.id}>
                          <TextField
                            id="outlined-basic"
                            InputLabelProps={{shrink: true}}
                            label={`Link ${index + 1}`}
                            value={link.name_network}
                            variant="outlined"
                            onChange={(e) => handleBranchChange(link.id, e.target.value)}

                          />
                        </Grid>
                      )}
                    </Grid>
                    <Grid display="flex" flexDirection="row" justifyContent="center" sx={{transition: "0.3", width: "80%", margin: "auto", borderRadius: "8px", padding: 2}}>
                      <Button onClick={handleValidateLinks}>
                        <DoneIcon/>
                      </Button>
                      <Button onClick={handleCloseLinksFields}>
                        <CloseIcon/>
                      </Button>
                    </Grid>
                  </Grid>
              // LINK END MODIFY
                ) :
                (
                  // LINK START DISPLAY
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    {pathWithNestedBranchs?.branchs.map((b) =>
                      <Grid item mt={3} key={b.id}>
                        <Button sx={{backgroundColor: "black"}} variant="contained" href={b.url_network} target="_blank">{b.name_network}</Button>
                      </Grid>
                    )}
                  </Grid>
                  // LINK END DISPLAY
                )
              }
              {/* BUTTON START TO MODIFY NETWORK*/}
              <Grid>
                <Grid display="flex" justifyContent="right">
                  <Button sx={{backgroundColor: "black"}} onClick={() => setModifyLinksFields(!modifyLinksFields)} variant="contained">
                    <CreateIcon/>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
              {/* BUTTON START TO MODIFY NETWORK*/}
          </Grid>


      }


    </>
  )
}