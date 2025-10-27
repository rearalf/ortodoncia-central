type toothPositionStateType = "" | "decay" | "filling" | "disable";

type toothStateType =
  | null
  | ""
  | "extraction"
  | "extracted"
  | "disable"
  | "endodonticsGoodCondition"
  | "endodonticBadCondition"
  | "absent"
  | "selectTooth";

type toothPosition =
  | "palatina"
  | "mesial"
  | "distal"
  | "vestibular"
  | "oclusal";

type abutmentToothStateType = boolean | "" | "disable" | "falseTooth";

// eslint-disable-next-line
const toothPositionState = {
  decay: "decay",
  filling: "filling",
};

type TOOTH_STATE_TYPE =
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

type TOOTH_FACE_AFFECTION_TYPE = null | "" | "decay" | "filling";

type TOOTH_AFFECTION = TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE;

interface toothObject {
  tooth: number;
  toothNotes?: string;
  toothState: TOOTH_STATE_TYPE;
  palatina: TOOTH_FACE_AFFECTION_TYPE;
  distal: TOOTH_FACE_AFFECTION_TYPE;
  mesial: TOOTH_FACE_AFFECTION_TYPE;
  vestibular: TOOTH_FACE_AFFECTION_TYPE;
  oclusal: TOOTH_FACE_AFFECTION_TYPE;
  abutmentTooth: boolean;
  falseTooth: boolean;
  pitFissureSealant: pitFissureSealantType;
}

type Quadrant = toothObject[];

type QuadrantKey = "1" | "2" | "3" | "4";
type TemporaryQuadrantKey = "5" | "6" | "7" | "8";

interface Odontogram {
  permanent: Record<QuadrantKey, Quadrant>;
  temporary: Record<TemporaryQuadrantKey, Quadrant>;
}

type pitFissureSealantType = 0 | 1 | 2 | "";
