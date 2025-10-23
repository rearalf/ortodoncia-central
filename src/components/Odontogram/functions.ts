export function modifyPositionStatus(
  quadrant: number,
  tooth: number,
  teethList: Odontogram,
  positionState: toothPositionStateType,
  position: toothPosition,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };
  if (quadrant < 5) {
    updatedTeethList.permanent[quadrant].map((toothObj) => {
      if (toothObj.falseTooth || toothObj.abutmentTooth) {
        setHandleState({
          severity: "warning",
          variant: "filled",
          show: true,
          text: "Debe deshacer el puente antes de cambiar todo.",
        });
        return;
      }

      if (toothObj.tooth === tooth) {
        toothObj[position] = positionState === "disable" ? "" : positionState;
        toothObj.toothState = "";
      }
    });
  } else {
    updatedTeethList.temporary[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj[position] = positionState === "disable" ? "" : positionState;
        toothObj.toothState = "";
      }
    });
  }
  return updatedTeethList;
}

export function modifyExtractionStatus(
  tooth: number,
  quadrant: number,
  toothState: toothStateType,
  teethList: Odontogram,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };
  if (quadrant < 5) {
    updatedTeethList.permanent[quadrant].map((toothObj) => {
      if (toothObj.falseTooth || toothObj.abutmentTooth) {
        setHandleState({
          severity: "warning",
          variant: "filled",
          show: true,
          text: "Debe deshacer el puente antes de cambiar todo.",
        });
        return;
      }

      if (toothObj.tooth === tooth) {
        toothObj.toothState = toothState === "disable" ? "" : toothState;
      }
    });
  } else {
    updatedTeethList.temporary[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.toothState = toothState === "disable" ? "" : toothState;
      }
    });
  }
  return updatedTeethList;
}

export function modifyFixedPartialBridge(
  quadrant: number,
  tooth: number,
  teethList: Odontogram,
  abutmentToothState: abutmentToothStateType,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };

  if (quadrant >= 5) {
    setHandleState({
      severity: "error",
      variant: "filled",
      show: true,
      text: "No se hacen puentes en este cuadrante.",
    });
    return;
  }

  const abutments = updatedTeethList.permanent[quadrant].filter(
    (t) => t.tooth === tooth
  )[0];

  if (abutmentToothState === true && abutments.toothState !== "") {
    setHandleState({
      severity: "warning",
      variant: "filled",
      show: true,
      text: "Este diente ya ha sido modificado.",
    });
    return;
  }

  if (abutmentToothState === "disable") {
    updatedTeethList.permanent[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.falseTooth = false;
        toothObj.abutmentTooth = false;
      }
    });
  } else if (abutmentToothState === "falseTooth") {
    updatedTeethList.permanent[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.falseTooth = true;
      }
    });
  } else {
    updatedTeethList.permanent[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.abutmentTooth = true;
      }
    });
  }

  return updatedTeethList;
}

export function modifyPitFissuereSealant(
  tooth: number,
  quadrant: number,
  teethList: Odontogram,
  pitFissureSealant: pitFissureSealantType,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };
  if (quadrant < 5) {
    updatedTeethList.permanent[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        if (
          toothObj.abutmentTooth ||
          toothObj.falseTooth ||
          toothObj.toothState !== ""
        ) {
          setHandleState({
            severity: "warning",
            variant: "filled",
            show: true,
            text: "No puede marcar este diente",
          });
          return;
        }
        toothObj.pitFissureSealant = pitFissureSealant;
        return;
      }
    });
  } else {
    updatedTeethList.temporary[quadrant].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        if (
          toothObj.abutmentTooth ||
          toothObj.falseTooth ||
          toothObj.toothState !== ""
        ) {
          setHandleState({
            severity: "warning",
            variant: "filled",
            show: true,
            text: "No puede marcar este diente",
          });
          return;
        }
        toothObj.pitFissureSealant = pitFissureSealant;
        return;
      }
    });
  }
  return updatedTeethList;
}
