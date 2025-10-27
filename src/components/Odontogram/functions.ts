export function modifyPositionStatus(
  quadrant: QuadrantKey | TemporaryQuadrantKey,
  tooth: number,
  teethList: Odontogram,
  positionState: toothPositionStateType,
  position: toothPosition,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };
  if (["1", "2", "3", "4"].includes(quadrant)) {
    const q = quadrant as QuadrantKey;
    updatedTeethList.permanent[q].map((toothObj) => {
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
    const q = quadrant as TemporaryQuadrantKey;
    updatedTeethList.temporary[q].map((toothObj) => {
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
  quadrant: QuadrantKey | TemporaryQuadrantKey,
  toothState: toothStateType,
  teethList: Odontogram,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };
  if (["1", "2", "3", "4"].includes(quadrant)) {
    const q = quadrant as QuadrantKey;
    updatedTeethList.permanent[q].map((toothObj) => {
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
    const q = quadrant as TemporaryQuadrantKey;
    updatedTeethList.temporary[q].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.toothState = toothState === "disable" ? "" : toothState;
      }
    });
  }
  return updatedTeethList;
}

export function modifyFixedPartialBridge(
  quadrant: QuadrantKey | TemporaryQuadrantKey,
  tooth: number,
  teethList: Odontogram,
  abutmentToothState: abutmentToothStateType,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };

  if (["5", "6", "7", "8"].includes(quadrant)) {
    setHandleState({
      severity: "error",
      variant: "filled",
      show: true,
      text: "No se hacen puentes en este cuadrante.",
    });
    return;
  }
  const q = quadrant as QuadrantKey;
  const abutments = updatedTeethList.permanent[q].filter(
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
    updatedTeethList.permanent[q].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.falseTooth = false;
        toothObj.abutmentTooth = false;
      }
    });
  } else if (abutmentToothState === "falseTooth") {
    updatedTeethList.permanent[q].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.falseTooth = true;
      }
    });
  } else {
    updatedTeethList.permanent[q].map((toothObj) => {
      if (toothObj.tooth === tooth) {
        toothObj.abutmentTooth = true;
      }
    });
  }

  return updatedTeethList;
}

export function modifyPitFissuereSealant(
  tooth: number,
  quadrant: QuadrantKey | TemporaryQuadrantKey,
  teethList: Odontogram,
  pitFissureSealant: pitFissureSealantType,
  setHandleState: setAlertType
) {
  const updatedTeethList = { ...teethList };
  if (["1", "2", "3", "4"].includes(quadrant)) {
    const q = quadrant as QuadrantKey;
    updatedTeethList.permanent[q].map((toothObj) => {
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
    const q = quadrant as TemporaryQuadrantKey;
    updatedTeethList.temporary[q].map((toothObj) => {
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
