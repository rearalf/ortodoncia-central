import { IToothObject } from "./type";

function useMigrateTeethData() {
  const migratedData = (teethData: Odontogram): Odontogram => {
    const migrateQuadrant = (quadrant: IToothObject[]) => {
      return quadrant.map((tooth) => {
        if (
          tooth.abutmentTooth === undefined &&
          tooth.falseTooth === undefined &&
          tooth.pitFissureSealant === undefined
        ) {
          return tooth;
        }

        const updatedTooth: IToothObject = { ...tooth };

        if (tooth.abutmentTooth) {
          updatedTooth.toothState = "bridgeAbutment";
        } else if (tooth.falseTooth) {
          updatedTooth.toothState = "bridgePontic";
        } else if (tooth.pitFissureSealant === 1) {
          updatedTooth.toothState = "sealantPending";
        } else if (tooth.pitFissureSealant === 2) {
          updatedTooth.toothState = "sealantDone";
        }

        delete updatedTooth.abutmentTooth;
        delete updatedTooth.falseTooth;
        delete updatedTooth.pitFissureSealant;

        return updatedTooth;
      });
    };

    return {
      permanent: {
        1: migrateQuadrant(teethData.permanent["1"]),
        2: migrateQuadrant(teethData.permanent["2"]),
        3: migrateQuadrant(teethData.permanent["3"]),
        4: migrateQuadrant(teethData.permanent["4"]),
      },
      temporary: {
        5: migrateQuadrant(teethData.temporary["5"]),
        6: migrateQuadrant(teethData.temporary["6"]),
        7: migrateQuadrant(teethData.temporary["7"]),
        8: migrateQuadrant(teethData.temporary["8"]),
      },
    } as Odontogram;
  };

  return migratedData;
}

export default useMigrateTeethData;
