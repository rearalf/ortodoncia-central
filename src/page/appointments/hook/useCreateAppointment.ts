import { useNavigate, useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import {
  useState,
  FormEvent,
  useEffect,
  useCallback,
  ChangeEvent,
  useMemo,
} from "react";

import { Appointment, Doctors, Patient } from "@/models";

import useMigrateTeethData from "@/components/Odontogram/useMigrateTeethData";
import { OdontogramType } from "@/components/Odontogram/type";

import useTeethState from "@/states/toothFormState";
import usePatientState from "@/states/patientState";
import useAlertState from "@/states/useAlertState";
import useDoctorsState from "@/states/doctosState";

import getAge from "@/utils/getAge";
import formatDate from "@/utils/formatDate";
import { constantAppointment } from "@/utils/constants";

function useCreateAppointmnet() {
  const navigate = useNavigate();
  const { id_patient } = useParams();
  const { setHandleState } = useAlertState();
  const { patientData, setPatientData } = usePatientState();
  const { doctors, setDoctors } = useDoctorsState();

  const { teethList, setTeethList, setToothState, setCompleteOdontogram } =
    useTeethState();
  /* MIGRATION */
  const { hasObsoleteFields, migrateTeethData } = useMigrateTeethData();

  /* ESTADO DE CITA */
  const [date, setDate] = useState(constantAppointment.date);
  const [treatment, setTreatment] = useState(constantAppointment.treatment);
  const [cost, setCost] = useState(constantAppointment.cost);
  const [doctor, setDoctor] = useState(constantAppointment.doctor);

  const appointment = useMemo(
    () => ({ date, treatment, cost, doctor }),
    [date, treatment, cost, doctor]
  );

  const [titleName, setTitleName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeInputDate = (value: Date | null) => {
    try {
      if (value) setDate(value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSelectInput = (e: SelectChangeEvent<string>) => {
    try {
      setDoctor(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      setTreatment(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCost = (e: { target: { name: string; value: string } }) => {
    try {
      setCost(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelButton = useCallback(() => {
    if (patientData.id) navigate(`/home/patient-profile/${patientData.id}`);
    else navigate("/home");
    setToothState(null);
    setHandleState({
      severity: "warning",
      variant: "filled",
      show: true,
      text: "Datos no guardados.",
    });
  }, [patientData.id, navigate, setToothState, setHandleState]);

  const getPatientData = useCallback(async () => {
    try {
      if (id_patient) {
        setLoading(true);
        const patient = new Patient();
        const data = await patient.getPatient(id_patient);
        if (data !== undefined) {
          setPatientData({
            ...data,
            age: getAge(data.birthdate.toISOString()),
            formatBirthdate: formatDate({ date: data.birthdate }),
          });
          setTitleName(
            ` ${data.name.split(" ")[0]} ${
              data.name.split(" ")[2]
                ? data.name.split(" ")[2]
                : data.name.split(" ")[1]
                ? data.name.split(" ")[1]
                : ""
            }`
          );
          setCompleteOdontogram(data.completeOdontogram);

          if (data.teeth !== undefined) {
            const parsed: OdontogramType = JSON.parse(
              JSON.parse(JSON.stringify(data.teeth))
            );
            if (hasObsoleteFields(parsed)) {
              const migrated = migrateTeethData(parsed);
              if (JSON.stringify(parsed) !== JSON.stringify(migrated)) {
                const updateTeeth = await patient.updateOnlyTeeth(
                  id_patient,
                  migrated
                );
                if (updateTeeth)
                  console.log("🛠 Migrando odontograma del paciente...");
                else
                  console.log(
                    "🛠 Migrando odontograma del paciente tuvo error..."
                  );
              }
              setTeethList(migrated);
              return;
            }
            setTeethList(parsed);
          }
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigate(`patient-profile/${id_patient}`);
      setHandleState({
        severity: "warning",
        variant: "filled",
        show: true,
        text: "Datos del paciente no obtenidos.",
      });
    }
  }, [
    id_patient,
    setPatientData,
    setCompleteOdontogram,
    hasObsoleteFields,
    setTeethList,
    migrateTeethData,
    navigate,
    setHandleState,
  ]);

  const handleSaveAppointment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (patientData.id) {
        const saveNewAppointment = new Appointment();
        const newAppointment = await saveNewAppointment.saveNewAppointment(
          patientData.id,
          appointment,
          teethList
        );
        if (newAppointment !== undefined) {
          setLoading(false);
          setToothState(null);
          navigate(-1);
          setHandleState({
            severity: "success",
            variant: "filled",
            show: true,
            text: "Datos de la cita guardados.",
          });
        } else {
          setLoading(false);
          setToothState(null);
          throw "Error to saving data";
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Error button teeth form: " + error);
      setHandleState({
        severity: "error",
        variant: "filled",
        show: true,
        text: "Error al guardar los datos.",
      });
    }
  };

  const getDoctors = useCallback(async () => {
    try {
      const doctorsModel = new Doctors();
      const doctorsData = await doctorsModel.getDoctors();
      if (Array.isArray(doctorsData)) setDoctors(doctorsData);
    } catch (error) {
      console.log(error);
    }
  }, [setDoctors]);

  useEffect(() => {
    if (patientData.id === undefined) {
      getPatientData();
    } else {
      setTitleName(
        ` ${patientData.name.split(" ")[0]} ${
          patientData.name.split(" ")[2]
            ? patientData.name.split(" ")[2]
            : patientData.name.split(" ")[1]
            ? patientData.name.split(" ")[1]
            : ""
        }`
      );
    }
  }, [
    patientData.id,
    navigate,
    setHandleState,
    id_patient,
    getPatientData,
    patientData.name,
  ]);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  return {
    doctors,
    loading,
    titleName,
    appointment,
    patientData,
    handleChangeCost,
    handleChangeInput,
    handleCancelButton,
    handleSaveAppointment,
    handleChangeInputDate,
    handleChangeSelectInput,
  };
}

export default useCreateAppointmnet;
