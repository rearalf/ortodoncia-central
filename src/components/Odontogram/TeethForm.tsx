import { Box, Grid, Typography } from "@mui/material";

import useTeethState from "@/states/toothFormState";

import TeethTable from "./TeethTable";
import ModalDetailTooth from "./ModalDetailTooth";
import RadioButtonComponent from "../RadioButtonComponent";

import "./styles.css";

const TeethForm = () => {
  const {
    toothState,
    positionState,
    pitFissureSealant,
    abutmentToothState,
    setToothState,
    setPositionState,
    setAbutmentTooth,
    setPitFissureSealant,
  } = useTeethState();

  const handlePositionState = (e: string | number) => {
    setPositionState(e as toothPositionStateType);
    if (e !== "") {
      setToothState("");
      setAbutmentTooth("");
      setPitFissureSealant("");
    }
  };

  const handleToothState = (e: string | number) => {
    setToothState(e as toothStateType);
    if (e !== "") {
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
      setToothState("");
      setPositionState("");
      setPitFissureSealant("");
    }
  };

  const handlePitFissureSealant = (e: string | number) => {
    const value = Number(e);
    if (value === 0 || value === 1 || value === 2) setPitFissureSealant(value);
    if (e !== "") {
      setToothState("");
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
            Estado del diente:
          </Typography>
          <RadioButtonComponent
            id="positionState"
            onChange={handlePositionState}
            value={positionState}
            options={[
              { label: "Caries", value: "decay" },
              { label: "Obturación", value: "filling" },
              { label: "Deshacer", value: "disable" },
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

        <Grid>
          <Typography variant="h6" gutterBottom>
            Selecciona una afectación:
          </Typography>
          <RadioButtonComponent
            id="toothState"
            onChange={handleToothState}
            value={toothState || ""}
            options={[
              { label: "Deshacer", value: "disable" },
              { label: "A extracción", value: "extraction" },
              { label: "Extraida", value: "extracted" },
              { label: "Ausente", value: "absent" },
              {
                label: "Endodoncia mal estado",
                value: "endodonticBadCondition",
              },
              {
                label: "Endodoncia buen estado",
                value: "endodonticsGoodCondition",
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
