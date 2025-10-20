import type { SxProps, Theme } from "@mui/material";

export enum TOOTH_STATE {
  HEALTHY = "healthy", // El diente está en buen estado, sin caries ni restauraciones.
  EXTRACTION = "extraction", // El diente está en proceso de extracción.
  EXTRACTION_DONE = "extracted", // El diente ha sido extraído con éxito.
  MISSING = "missing", // El diente está ausente, ya sea por causas naturales o por extracción previa.
  CROWN = "crown", // El diente tiene una corona colocada para cubrirlo y protegerlo.
  CROWN_GOOD = "crown_good", // Corona en buen estado
  CROWN_BAD = "crown_bad", // Corona en mal estado
  ROOT_CANAL = "root_canal", // El diente ha recibido tratamiento de conductos radiculares.
  IMPLANTED = "implanted", // El diente ha sido reemplazado por un implante.
  BRIDGE_ABUTMENT = "bridge_abutment", // El diente actúa como pilar para un puente dental.
  BRIDGE_PONTIC = "bridge_pontic", // El diente ha sido reemplazado por un pontic (diente falso) como parte de un puente.
}

export enum TOOTH_FACE_AFFECTION {
  HEALTHY = "healthy", // La cara está en buen estado, sin caries ni restauraciones.
  DECAY = "decay", // Caries en la cara específica del diente.
  FILLING = "filling", // Relleno o empaste en la cara específica del diente.
  FRACTURE = "fracture", // Fractura o fisura en la cara específica del diente.
  SEALANT = "sealant", // Sellado en la cara específica (por ejemplo, sellante de fosas y fisuras).
  BRIDGE = "bridge", // Reemplazo de diente con puente en la cara específica del diente.
  IMPLANT = "implant", // Implante colocado en la cara específica del diente.
  ABSCESS = "abscess", // Absceso o infección en la cara específica del diente.
  WEAR = "wear", // Desgaste en la cara específica del diente (por ejemplo, por bruxismo).
  EROSION = "erosion", // Erosión del esmalte en la cara específica del diente debido a ácidos.
  STAIN = "stain", // Manchas o decoloración en la cara específica del diente.
  CHIPPED = "chipped", // Diente astillado o con fragmentos rotos en la cara específica.
  SENSITIVE = "sensitive", // Sensibilidad en la cara específica del diente.
}

export type TOOTH_STATE_TYPE =
  | "healthy"
  | "decayed"
  | "extraction"
  | "extraction_done"
  | "missing"
  | "filling"
  | "crown"
  | "root_canal"
  | "implanted"
  | "bridge_abutment"
  | "bridge_pontic";

export type TOOTH_FACE_AFFECTION_TYPE =
  | "healthy"
  | "decay"
  | "filling"
  | "crown"
  | "fracture"
  | "sealant"
  | "bridge"
  | "implant"
  | "abscess"
  | "wear"
  | "erosion"
  | "stain"
  | "chipped"
  | "sensitive";

export type FACE_TYPE =
  | "palatina"
  | "distal"
  | "mesial"
  | "vestibular"
  | "oclusal";

export interface IToothObject {
  tooth: number;
  toothState: string;
  palatina: string;
  distal: string;
  mesial: string;
  vestibular: string;
  oclusal: string;
  abutmentTooth: boolean;
  falseTooth: boolean;
  pitFissureSealant: number;
}

type Quadrant = IToothObject[];

export type QuadrantKey = "1" | "2" | "3" | "4";
export type TemporaryQuadrantKey = "5" | "6" | "7" | "8";

export interface ITeethList {
  permanent: Record<QuadrantKey, Quadrant>;
  temporary: Record<TemporaryQuadrantKey, Quadrant>;
}

export type TeethStyles = {
  container: SxProps<Theme>;
  affectedTeeth: (toothState: TOOTH_STATE) => SxProps<Theme>;
  vestibularTeeth: (
    state: TOOTH_FACE_AFFECTION | string,
    toothState?: TOOTH_STATE | string
  ) => SxProps<Theme>;
  mesialTeeth: (
    state: TOOTH_FACE_AFFECTION | string,
    toothState?: TOOTH_STATE | string
  ) => SxProps<Theme>;
  distalTeeth: (
    state: TOOTH_FACE_AFFECTION | string,
    toothState?: TOOTH_STATE | string
  ) => SxProps<Theme>;
  oclusalTeeth: (
    state: TOOTH_FACE_AFFECTION | string,
    toothState?: TOOTH_STATE | string
  ) => SxProps<Theme>;
  palatinaTeeth: (
    state: TOOTH_FACE_AFFECTION | string,
    toothState?: TOOTH_STATE | string
  ) => SxProps<Theme>;
};

export type IOdontogramQuadrantsContainerStyles = {
  rowContainer: SxProps<Theme>;
  teethContainer: SxProps<Theme>;
  roowToothContainer: SxProps<Theme>;
};

export interface IOdontogramResponse {
  id: number;
  patient_id: number;
  appointment_id: number;
  created_at: string;
  updated_at: string;
  tooth: [
    {
      id: number;
      odontogram_id: number;
      tooth_number: number;
      general_state: TOOTH_STATE;
      palatina: TOOTH_FACE_AFFECTION;
      distal: TOOTH_FACE_AFFECTION;
      mesial: TOOTH_FACE_AFFECTION;
      vestibular: TOOTH_FACE_AFFECTION;
      oclusal: TOOTH_FACE_AFFECTION;
    }
  ];
}
