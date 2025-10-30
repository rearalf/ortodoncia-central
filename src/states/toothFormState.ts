import { create } from "zustand";

import { constantAppointment, constantTeethList } from "@/utils/constants";
import { OdontogramType, TOOTH_AFFECTION } from "@/components/Odontogram/type";

interface TeethStateInterface {
  teethList: OdontogramType;
  appointment: appointment;
  completeOdontogram: boolean;
  setCompleteOdontogram: (value: boolean) => void;

  setAppointment: (value: appointment) => void;
  setTeethList: (value: TeethStateInterface["teethList"]) => void;

  toothState: TOOTH_AFFECTION;
  setToothState: (value: TOOTH_AFFECTION) => void;
}

const useTeethState = create<TeethStateInterface>()((set) => ({
  appointment: constantAppointment,
  setAppointment: (value) =>
    set((state) => ({
      ...state,
      appointment: value,
    })),

  teethList: constantTeethList,
  setTeethList: (value) => set((state) => ({ ...state, teethList: value })),
  
  toothState: null,
  setToothState: (value) => set((state) => ({ ...state, toothState: value })),

  completeOdontogram: false,
  setCompleteOdontogram: (value) =>
    set((state) => ({ ...state, completeOdontogram: value })),
}));

export default useTeethState;
