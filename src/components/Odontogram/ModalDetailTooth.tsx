import { Box, Button, Dialog, IconButton } from "@mui/material";
import { FiSave, FiX, FiXCircle } from "react-icons/fi";

import Tooth from "./Tooth";
import InputBasic from "../InputBasic";
import { useDetailToothState } from "@/stores";
import { useEffect, useState } from "react";

const ModalDetailTooth = ({
  updateToothNoteInOdontogram,
}: {
  updateToothNoteInOdontogram: (tooth: number, description: string) => void;
}) => {
  const { tooth, openModal, setClearDetailToothState } = useDetailToothState();

  const [localNotes, setLocalNotes] = useState(tooth?.toothNotes || "");

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
    setClearDetailToothState();
  };

  const handleSave = () => {
    if (tooth) updateToothNoteInOdontogram(tooth.tooth, localNotes);
    handleClose();
  };

  useEffect(() => {
    setLocalNotes(tooth?.toothNotes || "");
  }, [tooth]);

  return (
    <Dialog open={openModal} maxWidth="sm" fullWidth>
      <IconButton
        sx={{
          position: "absolute",
          top: "15px",
          right: "15px",
        }}
        onClick={handleClose}
      >
        <FiX size={20} />
      </IconButton>

      {tooth && (
        <Tooth handleToothStateChange={() => {}} quadrant={"1"} tooth={tooth} />
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
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
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
          onClick={handleClose}
          startIcon={<FiXCircle />}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="success"
          type="button"
          startIcon={<FiSave />}
          onClick={handleSave}
        >
          Guardar
        </Button>
      </Box>
    </Dialog>
  );
};

export default ModalDetailTooth;
