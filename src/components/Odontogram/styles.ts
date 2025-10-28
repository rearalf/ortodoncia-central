import { IToothStyles } from "./type";

export const buttonStateTooth: IToothStyles = {
  buttonState: (toothState) => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    userSelect: "none",
    fontSize: {
      xs: "40px",
      sm: "45px",
      md: "65px",
      lg: "72px",
      xl: "80px",
    },
    display:
      toothState === "" || toothState === null || toothState === "absent"
        ? "none"
        : "block",
    lineHeight: {
      sm: "32px",
      md: "45px",
      lg: "52px",
      xl: "60px",
    },
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "font-size 0.5s ease-in-out",
    "&:hover": {
      fontSize: {
        md: "75px",
        lg: "78px",
        xl: "82px",
      },
    },
    // --- EXTRACCIÓN ---
    ...(toothState === "extraction" && {
      "&::after": {
        content: '"X"',
        color: "#e22f32",
        fontSize: "inherit",
        display: "block",
      },
    }),
    // --- EXTRAÍDO ---
    ...(toothState === "extracted" && {
      "&::after": {
        content: '"X"',
        color: "#00A6E2",
        fontSize: "inherit",
        display: "block",
      },
    }),
    // --- ENDODONCIA EN MAL ESTADO ---
    ...(toothState === "endodonticBadCondition" && {
      "&::after, &::before": {
        content: '""',
        display: "block",
        width: 0,
        height: 0,
        margin: "0 auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        borderBottom: "25px solid transparent",
      },
      "&::after": {
        borderBottomColor: "#e22f32",
      },
    }),
    // --- ENDODONCIA EN BUEN ESTADO ---
    ...(toothState === "endodonticsGoodCondition" && {
      "&::after, &::before": {
        content: '""',
        display: "block",
        width: 0,
        height: 0,
        margin: "0 auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        borderBottom: "25px solid transparent",
      },
      "&::after": {
        borderBottomColor: "#00A6E2",
      },
    }),
  }),
  buttonNumberStyles: {
    color: "#fff",
    fontSize: {
      xs: "8px",
      sm: "11px",
      md: "13px",
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  oclusalStyles: (toothState) => ({
    opacity: toothState === "absent" ? ".5" : "1",
    transition: "all 0.3s ease",
    color: "#fff",
    fontSize: {
      xs: "8px",
      sm: "11px",
      md: "13px",
    },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "14px",
      sm: "19px",
      md: "20px",
      lg: "24px",
      xl: "26px",
    },
    height: {
      xs: "14px",
      sm: "19px",
      md: "20px",
      lg: "24px",
      xl: "26px",
    },
    padding: 0,
    minWidth: 0,
  }),
};
