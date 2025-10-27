// import { useDetailToothState } from "@/stores";
import {
  modifyExtractionStatus,
  modifyFixedPartialBridge,
  modifyPitFissuereSealant,
  modifyPositionStatus,
} from "./functions";
import useTeethState from "@/states/toothFormState";
import useAlertState from "@/states/useAlertState";
import { useDetailToothState } from "@/stores";

function useOdontogramStates(enableButton: boolean) {
  const { setOpenModalWithData } = useDetailToothState();
  const {
    completeOdontogram,
    teethList,
    toothState,
    positionState,
    pitFissureSealant,
    abutmentToothState,
    setTeethList,
  } = useTeethState();
  const { setHandleState } = useAlertState();

  const findToothByNumber = (toothNumber: number) => {
    for (const quadrantKey of Object.keys(
      teethList.permanent
    ) as QuadrantKey[]) {
      const foundTooth = teethList.permanent[quadrantKey].find(
        (tooth) => tooth.tooth === toothNumber
      );
      if (foundTooth) {
        return { type: "permanent", quadrant: quadrantKey, tooth: foundTooth };
      }
    }

    for (const quadrantKey of Object.keys(
      teethList.temporary
    ) as TemporaryQuadrantKey[]) {
      const foundTooth = teethList.temporary[quadrantKey].find(
        (tooth) => tooth.tooth === toothNumber
      );
      if (foundTooth) {
        return { type: "temporary", quadrant: quadrantKey, tooth: foundTooth };
      }
    }
  };

  const hanldeModifyStateTooth = (
    quadrant: QuadrantKey | TemporaryQuadrantKey,
    tooth: number,
    position?: toothPosition
  ) => {
    if (!enableButton) return;

    if (
      positionState === "" &&
      toothState === "" &&
      abutmentToothState === "" &&
      pitFissureSealant === ""
    ) {
      setHandleState({
        severity: "info",
        variant: "filled",
        show: true,
        text: "Debe seleccionar una opción para modificar los estados del diente.",
      });
      return;
    }

    if (toothState === "selectTooth") {
      const toothObj = findToothByNumber(tooth);
      if (toothObj && toothObj.tooth) setOpenModalWithData(toothObj.tooth);
      return;
    }

    if (toothState === "" && positionState !== "" && position !== undefined) {
      const updatedTeethList = modifyPositionStatus(
        quadrant,
        tooth,
        teethList,
        positionState,
        position,
        setHandleState
      );
      if (updatedTeethList) setTeethList(updatedTeethList);
    }

    if (toothState !== "" && positionState === "") {
      const updatedTeethList = modifyExtractionStatus(
        tooth,
        quadrant,
        toothState,
        teethList,
        setHandleState
      );
      if (updatedTeethList) setTeethList(updatedTeethList);
    }

    if (
      toothState === "" &&
      positionState === "" &&
      abutmentToothState !== ""
    ) {
      const updatedTeethList = modifyFixedPartialBridge(
        quadrant,
        tooth,
        teethList,
        abutmentToothState,
        setHandleState
      );
      if (updatedTeethList) setTeethList(updatedTeethList);
    }

    if (
      toothState === "" &&
      positionState === "" &&
      abutmentToothState === "" &&
      pitFissureSealant !== ""
    ) {
      const updatedTeethList = modifyPitFissuereSealant(
        tooth,
        quadrant,
        teethList,
        pitFissureSealant,
        setHandleState
      );
      if (updatedTeethList) setTeethList(updatedTeethList);
    }
  };

  return {
    teethList,
    completeOdontogram,
    hanldeModifyStateTooth,
  };
}

export default useOdontogramStates;
