import TeethTable from '@/components/Odontogram/TeethTable'
import BackdropLoading from '@/components/BackdropLoading'
import HeadComponent from '@/components/HeadComponent'
import useAppointment from '@/hooks/useAppointment'
import BreadCrumbs from '@/components/BreadCrumbs'
import Navbar from '@/components/Navbar'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import '@/styles/AppointmentPage.css'

function AppointmentPage() {
	const { loading, appointment, patientData, last_appointment } = useAppointment()

	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent
				title={`Cita de ${patientData.name.split(' ')[0]} ${
					patientData.name.split(' ')[2]
						? patientData.name.split(' ')[2]
						: patientData.name.split(' ')[1]
				}`}
			/>
			<Navbar />
			<main className="appointment-page_main">
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
							link_to: `/patient-profile/${patientData.id}/appointment/${appointment.id}/update-appointment`,
						},
					]}
				/>
				<header className="main_header">
					<h1 className="header_title">
						Cita de{' '}
						{`${patientData.name.split(' ')[0]} ${
							patientData.name.split(' ')[2]
								? patientData.name.split(' ')[2]
								: patientData.name.split(' ')[1]
						}`}
					</h1>
					<Link
						to={
							last_appointment === 'true'
								? `/patient-profile/${patientData.id}/appointment/${appointment?.id}/update-appointment/true`
								: `/patient-profile/${patientData.id}/appointment/${appointment?.id}/update-appointment/false`
						}
					>
						<Button variant="contained">Modificar cita</Button>
					</Link>
				</header>
				<div className="main_content">
					<article className="main_detail-appointment">
						<h2 className="detail-appointment_title">Datos de la cita</h2>
						<div className="detail-appointment_data">
							<p className="info_data">
								Fecha: <span className="info">{appointment?.formatDate}</span>
							</p>
							<p className="info_data">
								Costo: <span className="info">$ {appointment?.cost}</span>
							</p>
							<p className="info_data">
								Doctor: <span className="info">{appointment?.doctor}</span>
							</p>
							<div className="info_data info_data_big">
								Tratamiento:{' '}
								<div className="info info_big">
									{appointment.treatment.split('\n').map((line, index) => (
										<p key={index}>{line}</p>
									))}
								</div>
							</div>
						</div>
					</article>

					<article className="main_patient">
						<h2 className="patient_title">Información del paciente</h2>
						<div className="detail-patient_data">
							<p className="info_data">
								Nombre: <span className="info">{patientData.name}</span>
							</p>
							<p className="info_data">
								Edad: <span className="info">{patientData.age}</span>
							</p>
							<p className="info_data">
								Fecha de nacimiento:{' '}
								<span className="info">
									{patientData.formatBirthdate?.toLocaleUpperCase()}
								</span>
							</p>
							<div className="info_data info_data_big">
								Razón:{' '}
								<div className="info info_big">
									{patientData.reason.split('\n').map((line, index) => (
										<p key={index}>{line}</p>
									))}
								</div>
							</div>
						</div>
					</article>

					{appointment.formatdateChange && appointment.reasonChange && (
						<article className="main_odontogram-changes">
							<h2>Cambios en el odontograma</h2>
							<div className="odontogram-changes_data">
								{appointment.formatdateChange && (
									<p className="info_data">
										Fecha del cambio:{' '}
										<span className="info">
											{appointment.formatdateChange.toUpperCase()}
										</span>
									</p>
								)}
								{appointment.reasonChange && (
									<div className="info_data info_data_big">
										Razón del cambio:
										<div className="info info_big">
											{appointment.reasonChange
												.split('\n')
												.map((line, index) => (
													<p key={index}>{line}</p>
												))}
										</div>
									</div>
								)}
							</div>
						</article>
					)}
				</div>

				<section className="main_odontograma">
					<h2 className="odontograma_title">Odontograma después de la cita</h2>
					<TeethTable />
				</section>
			</main>
		</>
	)
}

export default AppointmentPage
