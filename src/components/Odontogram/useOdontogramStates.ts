import useTeethState from "@/states/toothFormState";
import useAlertState from "@/states/useAlertState";
import { useDetailToothState } from "@/stores";

import {
  PERMANENT_TEETH,
  TOOTH_STATE_VALUES,
  TOOTH_FACE_AFFECTION_VALUES,
} from "./constants";

function useOdontogramStates(enableButton: boolean) {
  const { setOpenModalWithData } = useDetailToothState();
  const { setHandleState } = useAlertState();
  const {
    teethList,
    toothState,
    completeOdontogram,
    setTeethList,
    setToothState,
  } = useTeethState();

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
    face?: toothPosition
  ) => {
    if (!enableButton) return;

    if (toothState === null) {
      setHandleState({
        severity: "info",
        variant: "filled",
        show: true,
        text: "Debe seleccionar una opción para modificar los estados del diente.",
      });
      return;
    }

    const toothObj = findToothByNumber(tooth);

    if (toothState === "selectTooth") {
      if (toothObj && toothObj.tooth) setOpenModalWithData(toothObj.tooth);
      setToothState(null);
      return;
    }

    const updatedTeethList = { ...teethList };

    if (PERMANENT_TEETH.includes(quadrant)) {
      const q = quadrant as QuadrantKey;
      if (face && TOOTH_FACE_AFFECTION_VALUES.includes(toothState)) {
        updatedTeethList.permanent[q].forEach((t) => {
          if (t.tooth === tooth) {
            const state = toothState as TOOTH_FACE_AFFECTION_TYPE;
            t[face] = toothState === "" ? "" : state;
          }
        });
      } else if (TOOTH_STATE_VALUES.includes(toothState)) {
        updatedTeethList.permanent[q].forEach((t) => {
          if (t.tooth === tooth) {
            const state = toothState as TOOTH_STATE_TYPE;
            t.toothState = toothState === "" ? "" : state;
          }
        });
      }
    } else {
      const q = quadrant as TemporaryQuadrantKey;
      if (face && TOOTH_FACE_AFFECTION_VALUES.includes(toothState)) {
        updatedTeethList.temporary[q].forEach((t) => {
          if (t.tooth === tooth) {
            const state = toothState as TOOTH_FACE_AFFECTION_TYPE;
            t[face] = toothState === "" ? "" : state;
          }
        });
      } else if (TOOTH_STATE_VALUES.includes(toothState)) {
        updatedTeethList.temporary[q].forEach((t) => {
          if (t.tooth === tooth) {
            const state = toothState as TOOTH_STATE_TYPE;
            t.toothState = toothState === "" ? "" : state;
          }
        });
      }
    }

    setTeethList(updatedTeethList);
  };

  return {
    teethList,
    completeOdontogram,
    hanldeModifyStateTooth,
  };
}

export default useOdontogramStates;
