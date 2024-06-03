import {Grid, TextField} from "@mui/material";
import {PathType} from "../../../common/types.ts";
import {Dispatch, SetStateAction} from "react";

interface BioModifyProps {
  pathWithNestedBranchs : PathType;
  setPathWithNestedBranchs :SetStateAction<Dispatch<any>> ;
}

export const BioProfilModify = ({pathWithNestedBranchs,setPathWithNestedBranchs}:BioModifyProps) => {
  return (
    <Grid item>
      <TextField
        id="outlined-basic"
        InputLabelProps={{shrink: true}}
        label="Bio"
        defaultValue={pathWithNestedBranchs?.bio}
        multiline={true}
        value={pathWithNestedBranchs?.bio}
        variant="outlined"
        onChange={(e) => setPathWithNestedBranchs((prevState) => {
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
  )
}