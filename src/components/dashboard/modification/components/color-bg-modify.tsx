import {Button, Grid} from "@mui/material";
import {MuiColorInput} from "mui-color-input";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {PathType} from "../../../common/types.ts";

interface ColorPickerBoxProps {
  pathWithNestedBranchs: PathType;
  handleModifyBgColor: (newValue: string)=>void ;
  handleValidateBg: ()=>void ;
  handleCloseColorPicker: ()=>void ;
}

export const ColorBgModify = ({pathWithNestedBranchs,handleModifyBgColor,handleValidateBg,handleCloseColorPicker}: ColorPickerBoxProps) => {
  return (
    <Grid display="flex" flexDirection="row" justifyContent="center" sx={{transition: "0.3", backgroundColor: "white", width: "80%", margin: "auto", borderRadius: "8px", padding: 2}}>
      <MuiColorInput format="hex" value={pathWithNestedBranchs!.bgColor} onChange={handleModifyBgColor}/>
      <Button onClick={handleValidateBg}>
        <DoneIcon/>
      </Button>
      <Button onClick={handleCloseColorPicker}>
        <CloseIcon/>
      </Button>
    </Grid>
  )
}