import {Dispatch, SetStateAction} from "react";
import {BranchsPartialType} from "../../../common/types.ts";
import {Grid, TextField} from "@mui/material";

interface GenericCreateFieldsProps {
  setBranchToCreate: SetStateAction<Dispatch<any>>;
  keyParam: keyof BranchsPartialType;
  value: string;
}

export const GenericCreateFields = ({setBranchToCreate, keyParam, value}: GenericCreateFieldsProps) => {
  return (
    <Grid item mb={5}>
      <TextField
        id="outlined-basic"
        InputLabelProps={{shrink: true}}
        label="Link name"
        value={value}
        variant="outlined"
        onChange={(e) => setBranchToCreate((prev) => ({
          ...prev,
          [keyParam]: e.target.value,
        }))}
      />
    </Grid>
  )
}