import { Box, Button } from "@mui/material";

interface Props {
  tooth: toothObject;
  quadrant: QuadrantKey | TemporaryQuadrantKey;
  hanldeModifyStateTooth: (
    quadrant: QuadrantKey | TemporaryQuadrantKey,
    tooth: number,
    position?: toothPosition
  ) => void;
}

const Tooth = (props: Props) => (
  <div className="tooth_button" key={props.tooth.tooth}>
    <button
      className={`${"toothState"} ${
        props.tooth.toothState === ""
          ? ""
          : props.tooth.toothState === "extraction"
          ? "activeExtraction"
          : props.tooth.toothState === "extracted"
          ? "activeExtracted"
          : props.tooth.toothState === "endodonticBadCondition"
          ? "endodonticBadCondition"
          : props.tooth.toothState === "endodonticsGoodCondition"
          ? "endodonticsGoodCondition"
          : props.tooth.toothState === "absent" && "absent"
      }`}
      style={{ zIndex: 2 }}
      type="button"
      onClick={() =>
        props.hanldeModifyStateTooth(props.quadrant, props.tooth.tooth)
      }
    >
      <Box
        sx={{
          color: "#fff",
          fontSize: "0.875rem",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {props.tooth.tooth}
      </Box>
    </button>

    <button
      className={`abutment_tooth_state ${
        props.tooth.abutmentTooth ? "abutment_tooth" : ""
      } ${props.tooth.falseTooth ? "false_tooth" : ""}`}
      onClick={() =>
        props.hanldeModifyStateTooth(props.quadrant, props.tooth.tooth)
      }
    ></button>

    <button
      className={`pit_fissure_sealant ${
        props.tooth.pitFissureSealant === 1
          ? "sealant_tooth_blue"
          : props.tooth.pitFissureSealant === 2
          ? "sealant_tooth_red"
          : ""
      }`}
      onClick={() =>
        props.hanldeModifyStateTooth(props.quadrant, props.tooth.tooth)
      }
    ></button>

    <Button
      sx={{
        color: "#fff",
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        padding: 0,
        minWidth: 0,
        zIndex: 1,
        width: {
          xs: "15px",
          sm: "20px",
          md: "25px",
          lg: "27px",
        },
        height: {
          xs: "15px",
          sm: "20px",
          md: "25px",
          lg: "27px",
        },
        "&:hover": {
          filter: "brightness(0.9)",
        },
      }}
      type="button"
      onClick={() =>
        props.hanldeModifyStateTooth(
          props.quadrant,
          props.tooth.tooth,
          "oclusal"
        )
      }
    >
      {props.tooth.tooth}
    </Button>
    <Button
      variant={props.tooth.palatina === "" ? "outlined" : "contained"}
      className="palatina"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.palatina === "decay" ? "error" : "info"}
      onClick={() =>
        props.hanldeModifyStateTooth(
          props.quadrant,
          props.tooth.tooth,
          "palatina"
        )
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
      onClick={() =>
        props.hanldeModifyStateTooth(
          props.quadrant,
          props.tooth.tooth,
          "mesial"
        )
      }
    ></Button>
    <Button
      variant={props.tooth.distal === "" ? "outlined" : "contained"}
      className="distal"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.distal === "decay" ? "error" : "info"}
      onClick={() =>
        props.hanldeModifyStateTooth(
          props.quadrant,
          props.tooth.tooth,
          "distal"
        )
      }
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
        props.hanldeModifyStateTooth(
          props.quadrant,
          props.tooth.tooth,
          "vestibular"
        )
      }
    ></Button>
    <Button
      variant={props.tooth.oclusal === "" ? "outlined" : "contained"}
      className="oclusal"
      sx={{
        opacity: props.tooth.toothState === "absent" ? ".5" : "1",
        transition: "all 0.3s ease",
      }}
      color={props.tooth.oclusal === "decay" ? "error" : "info"}
      onClick={() =>
        props.hanldeModifyStateTooth(
          props.quadrant,
          props.tooth.tooth,
          "oclusal"
        )
      }
    ></Button>
  </div>
);

export default Tooth;
