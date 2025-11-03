import { Box, Button } from "@mui/material";

import { buttonStateTooth } from "./styles";
import { FACE_TYPE, FullQuadrantType, IToothObject } from "./type";
import { memo } from "react";

interface Props {
  tooth: IToothObject;
  quadrant: FullQuadrantType;
  handleToothStateChange: (tooth: number, position?: FACE_TYPE) => void;
}

const Tooth = memo((props: Props) => (
  <Box
    className="tooth_button"
    sx={buttonStateTooth.toothButton}
    key={props.tooth.tooth}
  >
    <Button
      sx={buttonStateTooth.buttonState(props.tooth.toothState)}
      onClick={() => props.handleToothStateChange(props.tooth.tooth)}
    >
      <Box sx={buttonStateTooth.buttonNumberStyles}>{props.tooth.tooth}</Box>
    </Button>

    <button
      className={`abutment_tooth_state ${
        props.tooth.abutmentTooth ? "abutment_tooth" : ""
      } ${props.tooth.falseTooth ? "false_tooth" : ""}`}
      onClick={() => props.handleToothStateChange(props.tooth.tooth)}
    ></button>

    <button
      className={`pit_fissure_sealant ${
        props.tooth.pitFissureSealant === 1
          ? "sealant_tooth_blue"
          : props.tooth.pitFissureSealant === 2
          ? "sealant_tooth_red"
          : ""
      }`}
      onClick={() => props.handleToothStateChange(props.tooth.tooth)}
    ></button>

    <Button
      variant={props.tooth.palatina === "" ? "outlined" : "contained"}
      className="palatina"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.palatina === "decay" ? "error" : "info"}
      onClick={() =>
        props.handleToothStateChange(props.tooth.tooth, "palatina")
      }
    ></Button>
    <Button
      variant={props.tooth.mesial === "" ? "outlined" : "contained"}
      className="mesial"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.mesial === "decay" ? "error" : "info"}
      onClick={() => props.handleToothStateChange(props.tooth.tooth, "mesial")}
    ></Button>
    <Button
      variant={props.tooth.distal === "" ? "outlined" : "contained"}
      className="distal"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.distal === "decay" ? "error" : "info"}
      onClick={() => props.handleToothStateChange(props.tooth.tooth, "distal")}
    ></Button>
    <Button
      variant={props.tooth.vestibular === "" ? "outlined" : "contained"}
      className="vestibular"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.vestibular === "decay" ? "error" : "info"}
      onClick={() =>
        props.handleToothStateChange(props.tooth.tooth, "vestibular")
      }
    ></Button>
    <Button
      variant={props.tooth.oclusal === "" ? "outlined" : "contained"}
      className="oclusal"
      sx={buttonStateTooth.oclusalStyles(props.tooth.toothState)}
      color={props.tooth.oclusal === "decay" ? "error" : "info"}
      onClick={() => props.handleToothStateChange(props.tooth.tooth, "oclusal")}
    >
      {props.tooth.tooth}
    </Button>
  </Box>
));

export default Tooth;
