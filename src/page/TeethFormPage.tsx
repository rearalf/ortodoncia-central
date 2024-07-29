import { FiArrowLeft, FiArrowRight, FiSave, FiXCircle } from 'react-icons/fi'
import InputNumericFormat from '@/components/NumericFormatCustom '
import BackdropLoading from '@/components/BackdropLoading'
import TeethForm from '@/components/Odontogram/TeethForm'
import useTeethFormPage from '@/hooks/useTeethFormPage'
import HeadComponent from '@/components/HeadComponent'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputSelect from '@/components/InputSelect'
import InputBasic from '@/components/InputBasic'
import InputDate from '@/components/InputDate'
import Navbar from '@/components/Navbar'
import { Button } from '@mui/material'
import '@/styles/TeethFormPage.css'

const TeethFormPage = () => {
	const {
		steps,
		doctors,
		loading,
		titleName,
		appointment,
		patientData,
		handleNextStep,
		handleSaveTeeth,
		handleChangeCost,
		handleChangeInput,
		handleCancelButton,
		handleChangeInputDate,
		handleChangeSelectInput,
	} = useTeethFormPage()
	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title="Odontograma de " />
			<Navbar />
			<main className="teethform_main">
				<BreadCrumbs
					links={[
						{
							link_name: 'Inicio',
							link_to: '/',
						},
						{
							link_name: `Paciente ${titleName}`,
							link_to: `/patient-profile/${patientData.id}`,
						},
						{
							link_name: 'Nueva cita',
							link_to: '/',
						},
					]}
				/>
				<h1 className="main_title">Nueava cita de {titleName}</h1>

				{steps === 1 ? (
					<div className="main_teethForm">
						<TeethForm />
						<div className="btn_group">
							<Button
								variant="contained"
								color="info"
								type="button"
								onClick={handleNextStep}
								startIcon={<FiArrowRight />}
							>
								Siguiente paso
							</Button>
							<Button
								variant="outlined"
								color="error"
								type="button"
								onClick={handleCancelButton}
								startIcon={<FiXCircle />}
							>
								Cancelar
							</Button>
						</div>
					</div>
				) : (
					<form onSubmit={handleSaveTeeth} className="main_lastform">
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
								onChange={value => {
									handleChangeCost(value)
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
						<div className="btn_group">
							<Button
								variant="contained"
								color="success"
								type="submit"
								startIcon={<FiSave />}
							>
								Guardar
							</Button>
							<Button
								variant="outlined"
								color="info"
								type="button"
								onClick={handleCancelButton}
								startIcon={<FiArrowLeft />}
							>
								Paso anterior
							</Button>
						</div>
					</form>
				)}
			</main>
		</>
	)
}

export default TeethFormPage
