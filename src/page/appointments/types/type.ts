import { OdontogramType } from "@/components/Odontogram/type";

export interface IAppointment {
  date: Date;
  treatment: string;
  cost: string;
  doctor: string;
  created_at: Date;
  updated_at: Date;
  id?: string;
  id_patient?: string;
  formatDate?: string;
  format_created_at?: string;
  teeth?: OdontogramType;
  dateChange?: Date;
  formatdateChange?: string;
  reasonChange?: string;
}

export interface IAppointmentInterface {
  date: Date;
  treatment: string;
  cost: string;
  doctor: string;
}
