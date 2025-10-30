import { IToothObject } from "@/components/Odontogram/type";
import { create } from "zustand";

interface IUseDetailToothState {
  openModal: boolean;
  tooth: IToothObject | null;
  toothNotes: string | null;
  setToothNumber: (value: IToothObject) => void;
  setToothNotes: (value: string) => void;
  setClearDetailToothState: () => void;
  setOpenModalWithData: (tooth: IToothObject) => void;
}

const useDetailToothState = create<IUseDetailToothState>((set) => ({
  openModal: false,
  toothNotes: null,
  tooth: null,
  setToothNumber: (tooth) => set((state) => ({ ...state, tooth })),
  setToothNotes: (toothNotes) => set((state) => ({ ...state, toothNotes })),
  setClearDetailToothState: () =>
    set((state) => ({
      ...state,
      toothNotes: null,
      tooth: null,
      openModal: false,
      selectTooth: false,
    })),
  setOpenModalWithData: (tooth) =>
    set((state) => ({
      ...state,
      openModal: true,
      selectTooth: false,
      tooth,
      toothNotes: tooth.toothNotes,
    })),
}));

export default useDetailToothState;
