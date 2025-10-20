import { Grid, Typography } from "@mui/material";

import RadioButtonComponent from "@/components/RadioButtonComponent";
import useAffectationState from "@/states/useAffectationState";
import {
  TOOTH_STATE,
  TOOTH_STATE_TYPE,
  TOOTH_FACE_AFFECTION,
  TOOTH_FACE_AFFECTION_TYPE,
} from "../types/type";

const AffectationForm = () => {
  const selectedAffection: TOOTH_STATE_TYPE | TOOTH_FACE_AFFECTION_TYPE | null =
    useAffectationState((state) => state.affectation);

  const selectedAffectationState = useAffectationState(
    (state) => state.setAffectation
  );

  return (
    <Grid>
      <Typography variant="h6" gutterBottom>
        Selecciona una afectación:
      </Typography>

      <RadioButtonComponent
        id="decay-filling"
        onChange={(e) =>
          selectedAffectationState(e as TOOTH_FACE_AFFECTION_TYPE)
        }
        value={selectedAffection || ""}
        options={[
          { label: "Sano", value: TOOTH_FACE_AFFECTION.HEALTHY },
          { label: "Caries", value: TOOTH_FACE_AFFECTION.DECAY },
          { label: "Obturación", value: TOOTH_FACE_AFFECTION.FILLING },
          {
            label: "A extracción",
            value: TOOTH_STATE.EXTRACTION,
          },
          {
            label: "Extraído",
            value: TOOTH_STATE.EXTRACTION_DONE,
          },
          {
            label: "Ausente",
            value: TOOTH_STATE.MISSING,
          },
          {
            label: "Corona",
            value: TOOTH_STATE.CROWN,
          },
          {
            label: "Corona en mal estado",
            value: TOOTH_STATE.CROWN_BAD,
          },
          {
            label: "Pilar de puente",
            value: TOOTH_STATE.BRIDGE_ABUTMENT,
          },
          {
            label: "Pontic de puente",
            value: TOOTH_STATE.BRIDGE_PONTIC,
          },
        ]}
        sx={{
          display: "grid",
          gap: 0,
          gridTemplateColumns: {
            lg: "repeat(8, 1fr)",
            md: "repeat(6, 1fr)",
            sm: "repeat(4, 1fr)",
            xs: "repeat(2, 1fr)",
          },
          justifyContent: "center",
          justifyItems: "left",
          mb: 4,
        }}
      />
    </Grid>
  );
};

export default AffectationForm;
