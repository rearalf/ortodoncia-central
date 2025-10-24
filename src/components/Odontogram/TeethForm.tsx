import useTeethState from "@/states/toothFormState";
import RadioGroupComponent from "../RadioGroup";
import TeethTable from "./TeethTable";
import React from "react";
import "./styles.css";
import ModalDetailTooth from "./ModalDetailTooth";

const TeethForm = () => {
  const {
    toothState,
    positionState,
    pitFissureSealant,
    abutmentToothState,
    setToothState,
    setPositionState,
    setAbutmentTooth,
    setPitFissureSealant,
  } = useTeethState();

  const handlePositionState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPositionState(e.target.value as toothPositionStateType);
    if (e.target.value !== "") {
      setToothState("");
      setAbutmentTooth("");
      setPitFissureSealant("");
    }
  };

  const handleToothState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToothState(e.target.value as toothStateType);
    if (e.target.value !== "") {
      setAbutmentTooth("");
      setPositionState("");
      setPitFissureSealant("");
    }
  };

  const handleAbutmentToothState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbutmentTooth(
      e.target.value === "true"
        ? true
        : e.target.value === "disable"
        ? "disable"
        : e.target.value === "falseTooth"
        ? "falseTooth"
        : ""
    );
    if (e.target.value !== "") {
      setToothState("");
      setPositionState("");
      setPitFissureSealant("");
    }
  };

  const handlePitFissureSealant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value === 0 || value === 1 || value === 2) setPitFissureSealant(value);

    if (e.target.value !== "") {
      setToothState("");
      setPositionState("");
      setAbutmentTooth("");
    }
  };

  return (
    <div className="teethForm">
      <ModalDetailTooth />
      <div className="optionsTeethForm">
        <RadioGroupComponent
          row
          id="positionState"
          label="Estado del diente"
          value={positionState}
          onChange={handlePositionState}
          options={[
            { label: "Caries", value: "decay" },
            { label: "Obturación", value: "filling" },
            { label: "Deshacer", value: "disable" },
          ]}
        />

        <RadioGroupComponent
          row
          id="abutmentToothState"
          label="Puente parcial fijo"
          value={abutmentToothState}
          onChange={handleAbutmentToothState}
          options={
            abutmentToothState === "falseTooth" || abutmentToothState
              ? [
                  { label: "Pilar", value: "true" },
                  { label: "Puente", value: "falseTooth" },
                  { label: "Deshacer", value: "disable" },
                ]
              : [
                  { label: "Pilar", value: "true" },
                  { label: "Deshacer", value: "disable" },
                ]
          }
        />
        <RadioGroupComponent
          row
          id="pitFissureSealant"
          label="Sellante de fosas y fisuras"
          value={pitFissureSealant}
          onChange={handlePitFissureSealant}
          options={[
            { label: "Sellante hecho", value: 1 },
            { label: "Sellante por hacer", value: 2 },
            { label: "Deshacer", value: 0 },
          ]}
        />
        <RadioGroupComponent
          row
          id="toothState"
          label="Afectaciones generales"
          value={toothState}
          onChange={handleToothState}
          options={[
            { label: "Deshacer", value: "disable" },
            { label: "A extracción", value: "extraction" },
            { label: "Extraida", value: "extracted" },
            { label: "Ausente", value: "absent" },
            { label: "Endodoncia mal estado", value: "endodonticBadCondition" },
            {
              label: "Endodoncia buen estado",
              value: "endodonticsGoodCondition",
            },
          ]}
        />
      </div>

      <TeethTable />
    </div>
  );
};

export default TeethForm;
