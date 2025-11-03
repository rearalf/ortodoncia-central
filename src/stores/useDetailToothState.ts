import { IToothObject } from "@/components/Odontogram/type";
import { create } from "zustand";

interface IUseDetailToothState {
  openModal: boolean;
  tooth: IToothObject | null;
  enableEditing: boolean;
  setEnableEditing: (value: boolean) => void;
  setClearDetailToothState: () => void;
  setToothNumber: (value: IToothObject) => void;
  setOpenModalWithData: (tooth: IToothObject) => void;
}

const useDetailToothState = create<IUseDetailToothState>((set) => ({
  openModal: false,
  tooth: null,
  enableEditing: true,
  setEnableEditing: (value) =>
    set((state) => ({
      ...state,
      enableEditing: value,
    })),
  setToothNumber: (tooth) => set((state) => ({ ...state, tooth })),
  setClearDetailToothState: () =>
    set((state) => ({
      ...state,
      tooth: null,
      openModal: false,
    })),
  setOpenModalWithData: (tooth) =>
    set((state) => ({
      ...state,
      openModal: true,
      tooth,
    })),
}));

export default useDetailToothState;
