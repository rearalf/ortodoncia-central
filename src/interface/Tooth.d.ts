type toothPositionStateType = "" | "decay" | "filling" | "disable";

type toothStateType =
  | ""
  | "extraction"
  | "extracted"
  | "disable"
  | "endodonticsGoodCondition"
  | "endodonticBadCondition"
  | "absent";

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

interface toothObject {
  tooth: number;
  toothNotes?: string;
  toothState: toothStateType;
  palatina: toothPositionStateType;
  distal: toothPositionStateType;
  mesial: toothPositionStateType;
  vestibular: toothPositionStateType;
  oclusal: toothPositionStateType;
  abutmentTooth: boolean;
  falseTooth: boolean;
  pitFissureSealant: pitFissureSealantType;
}

type Quadrant = toothObject[];

interface Odontogram {
  permanent: Record<string, Quadrant>;
  temporary: Record<string, Quadrant>;
}

type pitFissureSealantType = 0 | 1 | 2 | "";
