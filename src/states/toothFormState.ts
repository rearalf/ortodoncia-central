import { constantAppointment, constantTeethList } from "@/utils/constants";
import { create } from "zustand";

interface TeethStateInterface {
  teethList: Odontogram;
  appointment: appointment;
  completeOdontogram: boolean;
  setCompleteOdontogram: (value: boolean) => void;
  setAppointment: (value: appointment) => void;
  setTeethList: (value: TeethStateInterface["teethList"]) => void;

  toothState: TOOTH_AFFECTION;
  setToothState: (value: TOOTH_AFFECTION) => void;

  positionState: toothPositionStateType;
  setPositionState: (value: toothPositionStateType) => void;
  abutmentToothState: abutmentToothStateType;
  setAbutmentTooth: (value: abutmentToothStateType) => void;
  pitFissureSealant: pitFissureSealantType;
  setPitFissureSealant: (value: pitFissureSealantType) => void;
}

const useTeethState = create<TeethStateInterface>()((set) => ({
  teethList: constantTeethList,
  appointment: constantAppointment,
  setAppointment: (value) =>
    set((state) => ({
      ...state,
      appointment: value,
    })),
  setTeethList: (value) => set((state) => ({ ...state, teethList: value })),
  toothState: null,
  setToothState: (value) => set((state) => ({ ...state, toothState: value })),
  positionState: "",
  setPositionState: (value) =>
    set((state) => ({ ...state, positionState: value })),
  completeOdontogram: false,
  setCompleteOdontogram: (value) =>
    set((state) => ({ ...state, completeOdontogram: value })),
  abutmentToothState: "",
  setAbutmentTooth: (value) =>
    set((state) => ({ ...state, abutmentToothState: value })),
  pitFissureSealant: "",
  setPitFissureSealant: (value) =>
    set((state) => ({ ...state, pitFissureSealant: value })),
}));

export default useTeethState;
