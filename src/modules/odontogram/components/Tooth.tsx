import { Box, Button } from "@mui/material";
import { memo } from "react";
import { FACE_TYPE, IToothObject, TOOTH_STATE } from "../types/type";
import { teethStyles } from "../styles/styles";

interface IToothProps {
  toothData: IToothObject;
  handleToothInvolvement: (tooth: IToothObject, face?: FACE_TYPE) => void;
}

const Tooth = ({ toothData, handleToothInvolvement }: IToothProps) => {
  const { tooth, toothState, vestibular, mesial, distal, palatina, oclusal } =
    toothData;

  return (
    <Box sx={teethStyles.container} key={tooth}>
      {(toothState === TOOTH_STATE.EXTRACTION ||
        toothState === TOOTH_STATE.EXTRACTION_DONE ||
        toothState === TOOTH_STATE.MISSING) && (
        <Button
          variant="text"
          aria-label="Tooth Number Button"
          sx={teethStyles.affectedTeeth(toothState)}
          onClick={() => handleToothInvolvement(toothData)}
        >
          {toothState !== TOOTH_STATE.MISSING ? "X" : ""}
        </Button>
      )}
      <Button
        variant="outlined"
        aria-label="Vestibular"
        onClick={() => handleToothInvolvement(toothData, "vestibular")}
        sx={teethStyles.vestibularTeeth(vestibular, toothState)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Mesial"
        onClick={() => handleToothInvolvement(toothData, "mesial")}
        sx={teethStyles.mesialTeeth(mesial, toothState)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Distal"
        onClick={() => handleToothInvolvement(toothData, "distal")}
        sx={teethStyles.distalTeeth(distal, toothState)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Palatina"
        onClick={() => handleToothInvolvement(toothData, "palatina")}
        sx={teethStyles.palatinaTeeth(palatina, toothState)}
      ></Button>
      <Button
        variant="outlined"
        aria-label="Oclusal"
        onClick={() => handleToothInvolvement(toothData, "oclusal")}
        sx={teethStyles.oclusalTeeth(oclusal, toothState)}
      >
        {tooth}
      </Button>
    </Box>
  );
};

export default memo(Tooth, (prev, next) => {
  return (
    prev.toothData === next.toothData &&
    prev.handleToothInvolvement === next.handleToothInvolvement
  );
});
