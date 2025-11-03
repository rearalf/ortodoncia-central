import type { FC } from "react";
import {
  Box,
  Radio,
  useTheme,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { IRadioButtonComponentProps } from "./types";

const RadioButtonComponent: FC<IRadioButtonComponentProps> = ({
  value,
  onChange,
  options,
  sx,
  disabled = false,
  id,
}) => {
  const theme = useTheme();
  return (
    <RadioGroup
      row
      value={value}
      onChange={(e) => {
        const raw = e.target.value;
        const parsed = raw !== "" ? Number(raw) : NaN;
        const newValue = Number.isNaN(parsed) ? raw : parsed;
        onChange(newValue);
      }}
      sx={{ ...sx }}
      id={id}
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value.toString()}
          value={option.value.toString()}
          control={
            <Radio
              size="small"
              disabled={disabled}
              sx={{
                color: theme.palette.text.secondary,
                "&.Mui-checked": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {option.icon && option.icon}
              <Typography variant="body2">{option.label}</Typography>
            </Box>
          }
        />
      ))}
    </RadioGroup>
  );
};

export default RadioButtonComponent;
