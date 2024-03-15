import Navbar from '@/components/Navbar'
import TeethTable from '@/components/TeethTable'
import useAppointment from '@/hooks/useAppointment'
import HeadComponent from '@/components/HeadComponent'
import '@/styles/AppointmentPage.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

function AppointmentPage() {
	const { patientName, appointment, patientData } = useAppointment()
	return (
		<>
			<HeadComponent title={`Cita de ${patientName}`} />
			<Navbar />
			<main className="appointment-page_main">
				<header className="main_header">
					<h1 className="header_title">Cita de {patientName}</h1>
					<Link
						to={`/patient-profile/${patientData.id}/appointment/${appointment?.id}/update-appointment`}
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
							<p className="info_data">
								Tratamiento: <span className="info">{appointment?.treatment}</span>
							</p>
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
							<p className="info_data">
								Razón: <span className="info">{patientData.reason}</span>
							</p>
						</div>
					</article>
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