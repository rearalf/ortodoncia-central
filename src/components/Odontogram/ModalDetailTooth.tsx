import { Box, Button, Dialog, IconButton } from "@mui/material";
import { FiSave, FiX, FiXCircle } from "react-icons/fi";

import Tooth from "./Tooth";
import InputBasic from "../InputBasic";
import { useDetailToothState } from "@/stores";

const ModalDetailTooth = () => {
  const {
    tooth,
    toothNotes,
    openModal,
    setToothNotes,
    setClearDetailToothState,
  } = useDetailToothState();
  return (
    <Dialog open={openModal} maxWidth="sm" fullWidth>
      <IconButton
        sx={{
          position: "absolute",
          top: "15px",
          right: "15px",
        }}
        onClick={setClearDetailToothState}
      >
        <FiX size={20} />
      </IconButton>
      {tooth && (
        <Tooth hanldeModifyStateTooth={() => {}} quadrant={1} tooth={tooth} />
      )}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <InputBasic
          required
          multiline
          type="text"
          id="toothNotes"
          key="toothNotes"
          label="Observaciones del diente"
          value={toothNotes || ""}
          onChange={(e) => setToothNotes(e.target.value)}
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
          onClick={setClearDetailToothState}
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
