import {
  TOOTH_STATE_TYPE,
  TOOTH_FACE_AFFECTION_TYPE,
} from "@/modules/odontogram/types/type";
import { create } from "zustand";

interface IAffectationState {
  affectation: TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE | null;
  setAffectation: (
    value: TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE | null
  ) => void;
}

const useAffectationState = create<IAffectationState>((set) => ({
  affectation: null,
  setAffectation: (value) => set({ affectation: value }),
}));

export default useAffectationState;
