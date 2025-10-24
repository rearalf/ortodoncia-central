import { Box, Button, Dialog, IconButton } from "@mui/material";
import { FiSave, FiX, FiXCircle } from "react-icons/fi";
import Tooth from "./Tooth";
import InputBasic from "../InputBasic";

const ModalDetailTooth = () => {
  return (
    <Dialog open={false} maxWidth="sm" fullWidth>
      <IconButton
        sx={{
          position: "absolute",
          top: "15px",
          right: "15px",
        }}
      >
        <FiX size={20} />
      </IconButton>
      <Tooth
        hanldeModifyStateTooth={() => {}}
        quadrant={1}
        tooth={{
          tooth: 1,
          toothState: "",
          palatina: "",
          distal: "",
          mesial: "",
          vestibular: "",
          oclusal: "",
          abutmentTooth: false,
          falseTooth: false,
          pitFissureSealant: "",
        }}
      />

      <Box
        sx={{
          width: "100%",
        }}
      >
        <InputBasic
          required
          multiline
          type="text"
          id="tooth_notes"
          key="tooth_notes"
          label="Observaciones del diente"
          value={""}
          onChange={() => {}}
          sx={{
            width: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          type="button"
          onClick={() => {}}
          startIcon={<FiXCircle />}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="success"
          type="submit"
          startIcon={<FiSave />}
        >
          Guardar
        </Button>
      </Box>
    </Dialog>
  );
};

export default ModalDetailTooth;
