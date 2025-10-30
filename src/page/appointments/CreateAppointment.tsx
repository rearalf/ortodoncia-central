import { Box, Button, Typography } from "@mui/material";
import { FiSave, FiXCircle } from "react-icons/fi";

import InputNumericFormat from "@/components/NumericFormatCustom ";
import BackdropLoading from "@/components/BackdropLoading";
import TeethForm from "@/components/Odontogram/TeethForm";
import HeadComponent from "@/components/HeadComponent";
import BreadCrumbs from "@/components/BreadCrumbs";
import InputSelect from "@/components/InputSelect";
import InputBasic from "@/components/InputBasic";
import InputDate from "@/components/InputDate";

import useCreateAppointmnet from "./hook/useCreateAppointment";
import { CreateAppointmentBreadCrumbs } from "./constants";

import "@/styles/TeethFormPage.css";

// steps,
// handleNextStep,
const CreateAppointment = () => {
  const {
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
  } = useCreateAppointmnet();
  return (
    <>
      <BackdropLoading loading={loading} />
      <HeadComponent title={"Cita nueva para  " + titleName} />

      <div className="teethform_main">
        <Box component="header">
          <BreadCrumbs
            loading={loading}
            links={CreateAppointmentBreadCrumbs(
              titleName,
              patientData.id ? patientData.id : ""
            )}
          />
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              margin: "2rem 0",
              fontWeight: "bold",
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Nueva cita para {titleName}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSaveAppointment}>
          <div className="main_lastform">
            <h2 className="lastform_title">Cita de hoy</h2>
            <div className="lastform_form">
              <InputDate
                name="date"
                key="date"
                label="Fecha de la cita"
                value={appointment.date}
                onChange={handleChangeInputDate}
                helperText="MM/DD/YYYY"
                disabled
              />
              <InputNumericFormat
                required
                id="cost"
                key="cost"
                label="Costo"
                value={appointment.cost}
                onChange={(value) => {
                  handleChangeCost(value);
                }}
              />
              <InputSelect
                required
                key="doctor"
                id="doctor"
                label="Doctor"
                value={appointment.doctor}
                onChange={handleChangeSelectInput}
                items={doctors}
                propName="fullName"
                propValue="fullName"
              />
              <InputBasic
                required
                multiline
                type="text"
                id="treatment"
                key="treatment"
                label="Tratamiento"
                value={appointment.treatment}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="main_teethForm">
            <TeethForm />
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: {
                  md: "center",
                },
                alignItems: {
                  md: "center",
                },
              }}
            >
              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={handleCancelButton}
                startIcon={<FiXCircle />}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<FiSave />}
              >
                Guardar
              </Button>
            </Box>
          </div>
        </Box>
      </div>
    </>
  );
};

export default CreateAppointment;
