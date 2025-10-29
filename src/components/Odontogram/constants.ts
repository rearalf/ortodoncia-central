export const TOOTH_STATE_VALUES = [
  null,
  "",
  "selectTooth",
  "extraction",
  "extracted",
  "absent",
  "endodonticsGoodCondition",
  "endodonticBadCondition",
  "bridgeAbutment",
  "bridgePontic",
  "sealantDone",
  "sealantPending",
];

export enum TOOTH_STATE_ENUM {
  Disable = "",
  SelectTooth = "selectTooth",
  Extraction = "extraction",
  Extracted = "extracted",
  Absent = "absent",
  EndodonticsGoodCondition = "endodonticsGoodCondition",
  EndodonticBadCondition = "endodonticBadCondition",
  BridgeAbutment = "bridgeAbutment",
  BridgePontic = "bridgePontic",
  SealantDone = "sealantDone",
  SealantPending = "sealantPending",
}

export const TOOTH_FACE_AFFECTION_VALUES = [null, "", "decay", "filling"];

export enum TOOTH_FACE_AFFECTION_ENUM {
  Decay = "decay",
  Filling = "filling",
}

export const PERMANENT_TEETH = ["1", "2", "3", "4"];
