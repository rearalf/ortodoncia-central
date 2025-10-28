import { SxProps, Theme } from "@mui/material";

export type IToothStyles = {
  toothButton: SxProps<Theme>;
  buttonState: (toothState: TOOTH_STATE_TYPE) => SxProps<Theme>;
  buttonNumberStyles: SxProps<Theme>;
  oclusalStyles: (
    toothState: TOOTH_STATE_TYPE,
    oclusal?: TOOTH_FACE_AFFECTION_TYPE
  ) => SxProps<Theme>;
};
