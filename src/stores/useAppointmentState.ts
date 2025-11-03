import { create } from "zustand";

interface AppointmentStateInterface {
  appointments: appointment[];
  page: number;
  rowsPerPage: number;
  setPage: (value: number) => void;
  setRowsPerPage: (value: number) => void;
  setAppoinments: (value: AppointmentStateInterface["appointments"]) => void;
}

const useAppointmentState = create<AppointmentStateInterface>()((set) => ({
  appointments: [],
  page: 0,
  rowsPerPage: 5,
  setAppoinments: (value) =>
    set((state) => ({
      ...state,
      appointments: value,
    })),
  setPage: (value: number) =>
    set((state) => ({
      ...state,
      page: value,
    })),
  setRowsPerPage: (value) =>
    set((state) => ({
      ...state,
      rowsPerPage: value,
    })),
}));

export default useAppointmentState;
