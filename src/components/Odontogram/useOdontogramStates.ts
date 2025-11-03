import useTeethState from "@/states/toothFormState";
import useAlertState from "@/states/useAlertState";
import { useDetailToothState } from "@/stores";

import {
  PERMANENT_TEETH,
  TOOTH_STATE_VALUES,
  TOOTH_FACE_AFFECTION_VALUES,
} from "./constants";
import {
  FACE_TYPE,
  TOOTH_STATE_TYPE,
  PermanentQuadrantType,
  TemporaryQuadrantType,
  TOOTH_FACE_AFFECTION_TYPE,
} from "./type";

function useOdontogramStates(enableButton: boolean) {
  const { setOpenModalWithData, setEnableEditing } = useDetailToothState();
  const { setHandleState } = useAlertState();
  const { teethList, toothState, completeOdontogram, setTeethList } =
    useTeethState();

  const findToothByNumber = (toothNumber: number) => {
    for (const quadrantKey of Object.keys(
      teethList.permanent
    ) as PermanentQuadrantType[]) {
      const foundTooth = teethList.permanent[quadrantKey].find(
        (tooth) => tooth.tooth === toothNumber
      );
      if (foundTooth) {
        return { type: "permanent", quadrant: quadrantKey, tooth: foundTooth };
      }
    }

    for (const quadrantKey of Object.keys(
      teethList.temporary
    ) as TemporaryQuadrantType[]) {
      const foundTooth = teethList.temporary[quadrantKey].find(
        (tooth) => tooth.tooth === toothNumber
      );
      if (foundTooth) {
        return { type: "temporary", quadrant: quadrantKey, tooth: foundTooth };
      }
    }
  };

  const handleToothStateChange = (tooth: number, face?: FACE_TYPE) => {
    if (!enableButton && toothState !== "selectTooth") return;

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

    if (toothObj) {
      if (toothState === "selectTooth") {
        setOpenModalWithData(toothObj.tooth);
        setEnableEditing(true);
        return;
      }

      if (toothState === "selectToothEnableEditing") {
        setOpenModalWithData(toothObj.tooth);
        setEnableEditing(false);
        return;
      }

      const updatedTeethList = { ...teethList };

      if (PERMANENT_TEETH.includes(toothObj.quadrant)) {
        const q = toothObj.quadrant as PermanentQuadrantType;
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
        const q = toothObj.quadrant as TemporaryQuadrantType;
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
    }
  };

  const updateToothNoteInOdontogram = (tooth: number, description: string) => {
    const toothObj = findToothByNumber(tooth);

    if (toothObj) {
      const updatedTeethList = { ...teethList };
      if (PERMANENT_TEETH.includes(toothObj.quadrant)) {
        const q = toothObj.quadrant as PermanentQuadrantType;
        updatedTeethList.permanent[q].forEach((t) => {
          if (t.tooth === tooth) t.toothNotes = description;
        });
      } else {
        const q = toothObj.quadrant as TemporaryQuadrantType;
        updatedTeethList.temporary[q].forEach((t) => {
          if (t.tooth === tooth) t.toothNotes = description;
        });
      }
    }
  };

  return {
    teethList,
    completeOdontogram,
    handleToothStateChange,
    updateToothNoteInOdontogram,
  };
}

export default useOdontogramStates;
