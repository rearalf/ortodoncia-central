import useUpdateAppointmentPage from '@/hooks/useUpdateAppointmentPage'
import InputNumericFormat from '@/components/NumericFormatCustom '
import TeethTable from '@/components/Odontogram/TeethTable'
import BackdropLoading from '@/components/BackdropLoading'
import TeethForm from '@/components/Odontogram/TeethForm'
import HeadComponent from '@/components/HeadComponent'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputSelect from '@/components/InputSelect'
import { FiSave, FiXCircle } from 'react-icons/fi'
import InputBasic from '@/components/InputBasic'
import InputDate from '@/components/InputDate'
import Navbar from '@/components/Navbar'
import { Button } from '@mui/material'
import '@/styles/UpdateAppointmentPage.css'

function UpdateAppointmentPage() {
	const {
		doctors,
		loading,
		newChanges,
		appointment,
		patientData,
		showOdontogram,
		last_appointment,
		handleSave,
		handleCancel,
		handleChangeCost,
		handleChangeInput,
		handleChangeInputDate,
		handleChangeShowOdonto,
		handleChangeSelectInput,
		handleReasonChangeInput,
		handleReasonChangeInputDate,
	} = useUpdateAppointmentPage()

	const breadCrumbsLinks = [
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
			link_to: last_appointment
				? `/patient-profile/${patientData.id}/appointment/${appointment.id}/true`
				: `/patient-profile/${patientData.id}/appointment/${appointment.id}/false`,
		},
		{
			link_name: 'Modificar cita',
			link_to: `/patient-profile/${patientData.id}/appointment/${appointment.id}/update-appointment`,
		},
	]
	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title={`Cita de`} />
			<Navbar />
			<main className="update-appointment-page_main">
				<BreadCrumbs links={breadCrumbsLinks} />
				<header className="main_header">
					<h1>Modificar cita {patientData.name}</h1>
					<Button variant="contained" onClick={handleChangeShowOdonto}>
						{showOdontogram ? 'Ver formulario' : 'Ver odontograma'}
					</Button>
				</header>
				{showOdontogram ? (
					<section className="main_odontograma">
						<h2>Odontograma al finalizar la cita</h2>
						{last_appointment === 'true' ? <TeethForm /> : <TeethTable />}
					</section>
				) : (
					<form className="main_form">
						<div className="form_content">
							<div className="content_inputs">
								<InputDate
									name="date"
									key="date"
									label="Fecha de la cita"
									value={appointment.date}
									onChange={handleChangeInputDate}
									helperText={appointment.formatDate?.toUpperCase()}
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
									items={doctors}
									propName="fullName"
									propValue="fullName"
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
							{last_appointment !== 'true' && (
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
							)}
						</div>

						{last_appointment === 'true' && (
							<section className="form_reason-change">
								<h2>Razón del cambio</h2>
								<div className="reason-change_inputs">
									<InputDate
										name="dateChange"
										key="dateChange"
										label="Fecha del cambio"
										value={newChanges.dateChange}
										onChange={handleReasonChangeInputDate}
										helperText={newChanges.formatdateChange.toUpperCase()}
										disabled
									/>
									<InputBasic
										required
										multiline
										type="text"
										id="reasonChange"
										key="reasonChange"
										label="Razón del cambio"
										value={newChanges.reasonChange}
										onChange={handleReasonChangeInput}
									/>
								</div>
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
							</section>
						)}
					</form>
				)}
			</main>
		</>
	)
}

export default UpdateAppointmentPage
