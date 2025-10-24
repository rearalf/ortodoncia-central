import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";

export interface IRadioButtonComponentOption {
  value: string | number | boolean;
  label: string;
  icon?: ReactNode;
  color?: string;
}

export interface IRadioButtonComponentProps {
  value: string | number | boolean;
  onChange: (newValue: string | number) => void;
  options: IRadioButtonComponentOption[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
  id: string;
}
