import { Box, Grid, Typography } from "@mui/material";

import RadioButtonComponent from "../RadioButtonComponent";

import useTeethState from "@/states/toothFormState";
import TeethTable from "./TeethTable";
import { TOOTH_AFFECTION } from "./type";

import { TOOTH_FACE_AFFECTION_ENUM, TOOTH_STATE_ENUM } from "./constants";
import "./styles.css";

const TeethForm = () => {
  const { toothState, setToothState } = useTeethState();

  const handleToothState = (e: string | number | boolean | null) =>
    setToothState(e === 0 ? null : (e as TOOTH_AFFECTION));

  return (
    <div className="teethForm">
      <Box
        className="optionsTeethForm"
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: {
            sm: "wrap",
            md: "nowrap",
          },
          justifyContent: {
            xs: "center",
            sm: "space-between",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: {
            xs: "8px",
            sm: "20px",
          },
        }}
      >
        <Grid>
          <Typography variant="h6" gutterBottom>
            Selecciona una afectación:
          </Typography>
          <RadioButtonComponent
            id="toothState"
            onChange={handleToothState}
            value={toothState}
            options={[
              {
                label: "Seleccionar diente",
                value: TOOTH_STATE_ENUM.SelectTooth,
              },
              { label: "Deshacer", value: "" },
              { label: "Caries", value: TOOTH_FACE_AFFECTION_ENUM.Decay },
              {
                label: "Obturación",
                value: TOOTH_FACE_AFFECTION_ENUM.Filling,
              },
              {
                label: "Extracción por hacer",
                value: TOOTH_STATE_ENUM.Extraction,
              },
              { label: "Diente extraído", value: TOOTH_STATE_ENUM.Extracted },
              { label: "Ausente", value: TOOTH_STATE_ENUM.Absent },
              {
                label: "Endodoncia en mal estado",
                value: TOOTH_STATE_ENUM.EndodonticBadCondition,
              },
              {
                label: "Endodoncia en buen estado",
                value: TOOTH_STATE_ENUM.EndodonticsGoodCondition,
              },
              {
                label: "Sellante por hacer",
                value: TOOTH_STATE_ENUM.SealantPending,
              },
              {
                label: "Sellante hecho",
                value: TOOTH_STATE_ENUM.SealantDone,
              },
              {
                label: "Pilar del puente",
                value: TOOTH_STATE_ENUM.BridgePontic,
              },
              {
                label: "Póntico (pieza del puente)",
                value: TOOTH_STATE_ENUM.BridgeAbutment,
              },
            ]}
            sx={{}}
          />
        </Grid>
      </Box>

      <TeethTable />
    </div>
  );
};

export default TeethForm;
