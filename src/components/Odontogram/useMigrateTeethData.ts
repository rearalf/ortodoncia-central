import { useCallback } from "react";
import { IToothObject } from "./type";

function useMigrateTeethData() {
  const hasObsoleteFields = useCallback((teethData: Odontogram): boolean => {
    const checkQuadrant = (quadrant: IToothObject[]) =>
      quadrant.some(
        (tooth) =>
          "abutmentTooth" in tooth ||
          "falseTooth" in tooth ||
          "pitFissureSealant" in tooth
      );

    const permanentHasLegacy = Object.values(teethData.permanent).some(
      checkQuadrant
    );
    const temporaryHasLegacy = Object.values(teethData.temporary).some(
      checkQuadrant
    );

    return permanentHasLegacy || temporaryHasLegacy;
  }, []);

  const migrateTeethData = useCallback(
    (teethData: Odontogram): Odontogram => {
      if (!hasObsoleteFields(teethData)) {
        console.log("✅ No hay campos antiguos, no es necesaria la migración.");
        return teethData;
      }

      const migrateQuadrant = (quadrant: IToothObject[]): IToothObject[] =>
        quadrant.map((tooth) => {
          if (
            tooth.abutmentTooth === undefined &&
            tooth.falseTooth === undefined &&
            tooth.pitFissureSealant === undefined
          ) {
            return tooth;
          }

          const updatedTooth: IToothObject = { ...tooth };

          // Migración según tipo de campo
          if (tooth.abutmentTooth) {
            updatedTooth.toothState = "bridgePontic";
          } else if (tooth.falseTooth) {
            updatedTooth.toothState = "bridgeAbutment";
          } else if (tooth.pitFissureSealant === 1) {
            updatedTooth.toothState = "sealantPending";
          } else if (tooth.pitFissureSealant === 2) {
            updatedTooth.toothState = "sealantDone";
          }

          // Eliminar campos antiguos
          delete updatedTooth.abutmentTooth;
          delete updatedTooth.falseTooth;
          delete updatedTooth.pitFissureSealant;

          return updatedTooth;
        });

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
      };
    },
    [hasObsoleteFields]
  );

  return { hasObsoleteFields, migrateTeethData };
}

export default useMigrateTeethData;
