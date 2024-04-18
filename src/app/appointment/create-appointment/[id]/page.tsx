'use client'
import BackdropLoading from '@/components/BackdropLoading'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import InputDate from '@/components/InputDate'
import InputSelect from '@/components/InputSelect'
import Navbar from '@/components/Navbar'
import InputNumericFormat from '@/components/NumericFormatCustom '
import TeethForm from '@/components/Odontogram/TeethForm'
import useTeethFormPage from '@/hooks/useTeethFormPage'
import styles from '@/styles/CreateAppointmentPage.module.css'
import { Button } from '@mui/material'
import { FiArrowLeft, FiArrowRight, FiSave, FiXCircle } from 'react-icons/fi'

function CreateAppointment({ params }: { params: { id: string } }) {
	const {
		steps,
		loading,
		appointment,
		patientData,
		handleNextStep,
		handleSaveTeeth,
		handleChangeCost,
		handleChangeInput,
		handleCancelButton,
		handleChangeInputDate,
		handleChangeSelectInput,
	} = useTeethFormPage(params.id)

	return (
		<>
			<BackdropLoading loading={loading} />
			<Navbar />
			<main className={styles.main}>
				<BreadCrumbs
					links={[
						{
							link_name: 'Inicio',
							link_to: '/',
						},
						{
							link_name: `Paciente ${
								patientData.name ? patientData.name.split(' ')[0] : ''
							} ${
								patientData.name
									? patientData.name.split(' ')[2]
										? patientData.name.split(' ')[2]
										: patientData.name.split(' ')[1]
									: ''
							}`,
							link_to: `/patient/profile/${patientData.id}`,
						},
						{
							link_name: 'Nueva cita',
							link_to: '/',
						},
					]}
				/>
				<h1 className={styles.title}>
					{`Nueava cita de ${patientData.name ? patientData.name.split(' ')[0] : ''} ${
						patientData.name
							? patientData.name.split(' ')[2]
								? patientData.name.split(' ')[2]
								: patientData.name.split(' ')[1]
							: ''
					}`}
				</h1>

				{steps === 1 ? (
					<div className={styles.teeth_form}>
						<TeethForm className2={styles.form_controls} />
						<div className={styles.btn_group}>
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
					<form onSubmit={handleSaveTeeth} className={styles.last_form}>
						<h2 className={styles['last_form-title']}>Cita de hoy</h2>
						<div className={styles['last_form-form']}>
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
								items={[
									{
										item: 'Lorena',
										value: 'Lorena',
									},
									{
										item: 'Marenco',
										value: 'Marenco',
									},
								]}
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
						<div className={styles.btn_group}>
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

export default CreateAppointment
