import { IToothStyles } from "./type";

export const buttonStateTooth: IToothStyles = {
  toothButton: {
    position: "relative",
    width: {
      xs: "35px",
      sm: "45px",
      md: "50px",
      lg: "55px",
      xl: "65px",
    },
    height: {
      xs: "35px",
      sm: "45px",
      md: "50px",
      lg: "55px",
      xl: "65px",
    },
  },
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
    // --- ESTILOS BASE PARA SELLANTES ---
    ...((toothState === "sealantPending" || toothState === "sealantDone") && {
      transition: "font-size 0.5s ease-in-out",
      fontSize: "9px",
      width: "100%",
      minWidth: "100%",
      height: "4px",
      padding: "0",
      borderRadius: "1px",
      border: "none",
    }),
    // --- SELLANTES POR HACER ---
    ...(toothState === "sealantPending" && {
      backgroundColor: "#e22f32",
      display: "block",
      "&:hover": {
        backgroundColor: "#e22f32",
      },
    }),
    // --- SELLANTES HECHOS ---
    ...(toothState === "sealantDone" && {
      backgroundColor: "#00A6E2",
      display: "block",
      "&:hover": {
        backgroundColor: "#00A6E2",
      },
    }),
    ...((toothState === "bridgeAbutment" || toothState === "bridgePontic") && {
      fontSize: "9px",
      transition: "font-size 0.5s ease-in-out",
      padding: 0,
      minWidth: {
        xs: "38px",
        sm: "48px",
        md: "52px",
        lg: "58px",
        xl: "68px",
      },
      width: {
        xs: "38px",
        sm: "48px",
        md: "52px",
        lg: "58px",
        xl: "68px",
      },
      height: {
        xs: "38px",
        sm: "48px",
        md: "52px",
        lg: "58px",
        xl: "68px",
      },
      "&:hover": {
        backgroundColor: "#00000080",
      },
    }),
    ...(toothState === "bridgeAbutment" && {
      width: "85%",
      height: "85%",
      padding: 0,
      background: "#00000080",
      borderTop: "2px solid #8ae0ff",
      borderBottom: "2px solid #8ae0ff",
    }),
    ...(toothState === "bridgePontic" && {
      padding: 0,
      border: "3px solid #8ae0ff",
      background: "#00000080",
      borderRadius: "50%",
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
