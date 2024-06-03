import {Grid, TextField} from "@mui/material";
import {formatUrlToTitle} from "../format-text.ts";
import {PathType} from "../../../common/types.ts";
import {Dispatch, SetStateAction} from "react";

interface PathProfilModifyProps {
  pathWithNestedBranchs : PathType;
  setPathWithNestedBranchs :SetStateAction<Dispatch<any>> ;
}

export const PathProfilModify= ({pathWithNestedBranchs,setPathWithNestedBranchs}:PathProfilModifyProps) =>{
  return(
    // <Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          InputLabelProps={{shrink: true}}
          label="Url"
          defaultValue={formatUrlToTitle(pathWithNestedBranchs?.url_owner)}
          value={formatUrlToTitle(pathWithNestedBranchs?.url_owner)}
          variant="outlined"
          onChange={(e) => setPathWithNestedBranchs((prevState) => {
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
  )
}