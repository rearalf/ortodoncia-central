import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import InputDate from '@/components/InputDate'
import InputBasic from '@/components/InputBasic'
import { FiSave, FiXCircle } from 'react-icons/fi'
import InputSelect from '@/components/InputSelect'
import HeadComponent from '@/components/HeadComponent'
import InputNumericFormat from '@/components/NumericFormatCustom '
import useUpdateAppointmentPage from '@/hooks/useUpdateAppointmentPage'
import '@/styles/UpdateAppointmentPage.css'
import TeethTable from '@/components/TeethTable'
import BreadCrumbs from '@/components/BreadCrumbs'

function UpdateAppointmentPage() {
	const {
		appointment,
		patientData,
		handleSave,
		handleCancel,
		handleChangeCost,
		handleChangeInput,
		handleChangeInputDate,
		handleChangeSelectInput,
	} = useUpdateAppointmentPage()
	return (
		<>
			<HeadComponent title={`Cita de`} />
			<Navbar />
			<main className="update-appointment-page_main">
				<BreadCrumbs
					links={[
						{
							link_name: 'Inicio',
							link_to: '/',
						},
						{
							link_name: `Paciente ${patientData.name.split(' ')[0]} ${
								patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
							}`,
							link_to: `/patient-profile/${patientData.id}`,
						},
						{
							link_name: `Cita de ${patientData.name.split(' ')[0]} ${
								patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
							}`,
							link_to: `/patient-profile/${patientData.id}/appointment/${appointment.id}`,
						},
						{
							link_name: 'Modificar cita',
							link_to: `/patient-profile/${patientData.id}/appointment/${appointment.id}/update-appointment`,
						},
					]}
				/>
				<header className="main_header">
					<h1>Modificar cita {patientData.name}</h1>
				</header>
				<form className="main_form">
					<div className="form_content">
						<InputDate
							name="date"
							key="date"
							label="Fecha de la cita"
							value={appointment.date}
							onChange={handleChangeInputDate}
							helperText={appointment.formatDate}
							disabled
						/>
						<InputNumericFormat
							id="cost"
							key="cost"
							label="Costo"
							value={appointment.cost}
							onChange={value => {
								handleChangeCost(value)
							}}
						/>
						<InputSelect
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
							multiline
							type="text"
							id="treatment"
							key="treatment"
							label="Tratamiento"
							value={appointment.treatment}
							onChange={handleChangeInput}
						/>
					</div>

					<section className="form_odontograma">
						<h2>Odontograma al finalizar la cita</h2>
						<TeethTable />
					</section>

					<div className="btn_group">
						<Button
							variant="contained"
							color="success"
							onClick={handleSave}
							startIcon={<FiSave />}
						>
							Guardar
						</Button>
						<Button
							color="error"
							type="button"
							variant="outlined"
							onClick={handleCancel}
							startIcon={<FiXCircle />}
						>
							Cancelar
						</Button>
					</div>
				</form>
			</main>
		</>
	)
}

export default UpdateAppointmentPage
