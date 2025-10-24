import { create } from "zustand";

interface IUseDetailToothState {
  selectTooth: boolean;
  openModal: boolean;
  tooth: toothObject | null;
  toothNotes: string | null;
  setSelectTooth: (value: boolean) => void;
  setToothNumber: (value: toothObject) => void;
  setToothNotes: (value: string) => void;
  setClearDetailToothState: () => void;
  setOpenModalWithData: (tooth: toothObject) => void;
}

const useDetailToothState = create<IUseDetailToothState>((set) => ({
  selectTooth: false,
  openModal: false,
  toothNotes: null,
  tooth: null,
  setSelectTooth: (selectTooth) => set((state) => ({ ...state, selectTooth })),
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
  setOpenModalWithData: (tooth) => {
    console.log(tooth);
    set((state) => ({
      ...state,
      openModal: true,
      selectTooth: false,
      tooth,
      toothNotes: tooth.toothNotes,
    }));
  },
}));

export default useDetailToothState;
