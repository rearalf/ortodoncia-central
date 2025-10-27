import { Box, Grid, Typography } from "@mui/material";

import useTeethState from "@/states/toothFormState";

import TeethTable from "./TeethTable";
import ModalDetailTooth from "./ModalDetailTooth";
import RadioButtonComponent from "../RadioButtonComponent";

import "./styles.css";
import { TOOTH_FACE_AFFECTION_ENUM, TOOTH_STATE_ENUM } from "./constants";

const TeethForm = () => {
  const {
    toothState,
    // positionState,
    pitFissureSealant,
    abutmentToothState,
    setToothState,
    setPositionState,
    setAbutmentTooth,
    setPitFissureSealant,
  } = useTeethState();

  /*  const handlePositionState = (e: string | number) => {
    setPositionState(e as toothPositionStateType);
    if (e !== "") {
      setToothState("");
      setAbutmentTooth("");
      setPitFissureSealant("");
    }
  }; */

  const handleToothState = (e: string | number | boolean | null) => {
    setToothState(e === 0 ? "" : (e as TOOTH_AFFECTION));
    if (e !== null || e !== 0) {
      setAbutmentTooth("");
      setPositionState("");
      setPitFissureSealant("");
    }
  };

  const handleAbutmentToothState = (e: string | number | boolean) => {
    setAbutmentTooth(
      e === "true"
        ? true
        : e === "disable"
        ? "disable"
        : e === "falseTooth"
        ? "falseTooth"
        : ""
    );
    if (e !== "") {
      setToothState(null);
      setPositionState("");
      setPitFissureSealant("");
    }
  };

  const handlePitFissureSealant = (e: string | number) => {
    const value = Number(e);
    if (value === 0 || value === 1 || value === 2) setPitFissureSealant(value);
    if (e !== "") {
      setToothState(null);
      setPositionState("");
      setAbutmentTooth("");
    }
  };

  return (
    <div className="teethForm">
      <ModalDetailTooth />
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
              { label: "Obturación", value: TOOTH_FACE_AFFECTION_ENUM.Filling },
              { label: "A extracción", value: TOOTH_STATE_ENUM.Extraction },
              { label: "Extraida", value: TOOTH_STATE_ENUM.Extracted },
              { label: "Ausente", value: TOOTH_STATE_ENUM.Absent },
              {
                label: "Endodoncia mal estado",
                value: TOOTH_STATE_ENUM.EndodonticBadCondition,
              },
              {
                label: "Endodoncia buen estado",
                value: TOOTH_STATE_ENUM.EndodonticsGoodCondition,
              },
            ]}
            sx={{}}
          />
        </Grid>

        <Grid>
          <Typography variant="h6" gutterBottom>
            Puente parcial fijo:
          </Typography>
          <RadioButtonComponent
            id="abutmentToothState"
            onChange={handleAbutmentToothState}
            value={abutmentToothState}
            options={
              abutmentToothState === "falseTooth" || abutmentToothState
                ? [
                    { label: "Pilar", value: "true" },
                    { label: "Puente", value: "falseTooth" },
                    { label: "Deshacer", value: "disable" },
                  ]
                : [
                    { label: "Pilar", value: "true" },
                    { label: "Deshacer", value: "disable" },
                  ]
            }
            sx={{}}
          />
        </Grid>

        <Grid>
          <Typography variant="h6" gutterBottom>
            Sellante de fosas y fisuras:
          </Typography>
          <RadioButtonComponent
            id="pitFissureSealant"
            onChange={handlePitFissureSealant}
            value={pitFissureSealant}
            options={[
              { label: "Sellante hecho", value: 1 },
              { label: "Sellante por hacer", value: 2 },
              { label: "Deshacer", value: 0 },
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
