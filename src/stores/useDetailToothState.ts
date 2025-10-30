import { IToothObject } from "@/components/Odontogram/type";
import { create } from "zustand";

interface IUseDetailToothState {
  openModal: boolean;
  tooth: IToothObject | null;
  setClearDetailToothState: () => void;
  setToothNumber: (value: IToothObject) => void;
  setOpenModalWithData: (tooth: IToothObject) => void;
}

const useDetailToothState = create<IUseDetailToothState>((set) => ({
  openModal: false,
  tooth: null,
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
