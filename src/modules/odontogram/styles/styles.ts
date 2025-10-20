import { getFaceColor, getStateColor } from "@/utils/handleTeethStateColor";
import {
  IOdontogramQuadrantsContainerStyles,
  TeethStyles,
  TOOTH_FACE_AFFECTION,
  TOOTH_STATE,
} from "../types/type";

export const teethStyles: TeethStyles = {
  container: {
    position: "relative",
    width: {
      xs: 35,
      sm: 45,
      md: 55,
      lg: 65,
    },
    height: {
      xs: 35,
      sm: 45,
      md: 55,
      lg: 65,
    },
  },
  affectedTeeth: (general_state) => ({
    transition: "all 0.3s ease",
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    fontSize: {
      xs: 35,
      sm: 45,
      md: 55,
      lg: 65,
    },
    fontWeight: "lighter",
    color: getStateColor(general_state),
    transform:
      general_state === TOOTH_STATE.MISSING
        ? "translate(-9%, 9%)"
        : "transform: translate(0, 0);",
    minWidth:
      general_state === TOOTH_STATE.MISSING
        ? {
            xs: 35,
            sm: 45,
            md: 55,
            lg: 55,
          }
        : {
            xs: 35,
            sm: 45,
            md: 55,
            lg: 65,
          },
    height:
      general_state === TOOTH_STATE.MISSING
        ? {
            xs: 35,
            sm: 45,
            md: 55,
            lg: 55,
          }
        : {
            xs: 35,
            sm: 45,
            md: 55,
            lg: 65,
          },
  }),

  vestibularTeeth: (vestibular, general_state) => () => ({
    transition: "all 0.3s ease",
    position: "absolute",
    bottom: 0,
    left: "15%",
    padding: 0,
    minWidth: 0,
    borderTopLeftRadius: "60%",
    borderTopRightRadius: "60%",
    width: "70%",
    height: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "18px",
    },
    backgroundColor: getFaceColor(vestibular),
    borderColor:
      vestibular !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(vestibular)
        : undefined,
    "&:hover": {
      filter: "brightness(0.9)",
    },
    opacity: general_state === TOOTH_STATE.MISSING ? 0.3 : 1,
  }),

  mesialTeeth: (mesial, general_state) => () => ({
    transition: "all 0.1s ease",
    position: "absolute",
    left: 0,
    top: "20%",
    padding: 0,
    maxWidth: 0,
    height: "60%",
    borderTopRightRadius: "60%",
    borderBottomRightRadius: "60%",
    minWidth: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "18px",
    },
    backgroundColor: getFaceColor(mesial),
    borderColor:
      mesial !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(mesial)
        : undefined,
    "&:hover": {
      filter: "brightness(0.9)",
    },
    opacity: general_state === TOOTH_STATE.MISSING ? 0.3 : 1,
  }),

  distalTeeth: (distal, general_state) => () => ({
    transition: "all 0.3s ease",
    right: 0,
    top: "20%",
    padding: 0,
    minWidth: 0,
    height: "60%",
    position: "absolute",
    borderTopLeftRadius: "60%",
    borderBottomLeftRadius: "60%",
    width: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "18px",
    },
    backgroundColor: getFaceColor(distal),
    borderColor:
      distal !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(distal)
        : undefined,
    "&:hover": {
      filter: "brightness(0.9)",
    },
    opacity: general_state === TOOTH_STATE.MISSING ? 0.3 : 1,
  }),

  palatinaTeeth: (palatina, general_state) => () => ({
    transition: "all 0.3s ease",
    position: "absolute",
    top: 0,
    left: "15%",
    padding: 0,
    minWidth: 0,
    borderBottomLeftRadius: "60%",
    borderBottomRightRadius: "60%",
    width: "70%",
    height: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "18px",
    },
    backgroundColor: getFaceColor(palatina),
    borderColor:
      palatina !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(palatina)
        : undefined,
    "&:hover": {
      filter: "brightness(0.9)",
    },
    opacity: general_state === TOOTH_STATE.MISSING ? 0.3 : 1,
  }),

  oclusalTeeth: (oclusal, general_state) => () => ({
    transition: "all 0.3s ease",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    minWidth: 0,
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
    color: oclusal !== TOOTH_FACE_AFFECTION.HEALTHY ? "#fff" : "#19A7CE",
    backgroundColor: getFaceColor(oclusal),
    borderColor:
      oclusal !== TOOTH_FACE_AFFECTION.HEALTHY
        ? getFaceColor(oclusal)
        : undefined,
    "&:hover": {
      filter: "brightness(0.9)",
    },
    opacity: general_state === TOOTH_STATE.MISSING ? 0.3 : 1,
  }),
};

export const odontogramQuadrantsContainerStyles: IOdontogramQuadrantsContainerStyles =
  {
    rowContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: { lg: 3, xs: 1 },
    },
    teethContainer: { display: "flex", justifyContent: "center" },
    roowToothContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: {
        lg: 2,
        xs: 1,
      },
    },
  };
