import { SxProps, Theme } from "@mui/material";

export type PermanentQuadrantType = "1" | "2" | "3" | "4";
export type TemporaryQuadrantType = "5" | "6" | "7" | "8";

export type TOOTH_STATE_TYPE =
  | null
  | ""
  | "selectTooth"
  | "extraction"
  | "extracted"
  | "absent"
  | "endodonticsGoodCondition"
  | "endodonticBadCondition"
  | "bridgeAbutment"
  | "bridgePontic"
  | "sealantDone"
  | "sealantPending";

export type TOOTH_FACE_AFFECTION_TYPE = null | "" | "decay" | "filling";

export type TOOTH_AFFECTION = TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE;

export interface IToothObject {
  tooth: number;
  toothNotes?: string;
  toothState: TOOTH_STATE_TYPE;
  palatina: TOOTH_FACE_AFFECTION_TYPE;
  distal: TOOTH_FACE_AFFECTION_TYPE;
  mesial: TOOTH_FACE_AFFECTION_TYPE;
  vestibular: TOOTH_FACE_AFFECTION_TYPE;
  oclusal: TOOTH_FACE_AFFECTION_TYPE;
  abutmentTooth?: boolean;
  falseTooth?: boolean;
  pitFissureSealant?: pitFissureSealantType;
}

export type IToothStyles = {
  toothButton: SxProps<Theme>;
  buttonState: (toothState: TOOTH_STATE_TYPE) => SxProps<Theme>;
  buttonNumberStyles: SxProps<Theme>;
  oclusalStyles: (
    toothState: TOOTH_STATE_TYPE,
    oclusal?: TOOTH_FACE_AFFECTION_TYPE
  ) => SxProps<Theme>;
};
