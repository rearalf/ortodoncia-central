import Navbar from '@/components/Navbar'
import { Button, Tooltip } from '@mui/material'
import TeethTable from '@/components/TeethTable'
import HeadComponent from '@/components/HeadComponent'
import AppointmentsTable from '@/components/AppointmentsTable'
import usePatientProfilePage from '@/hooks/usePatientProfilePage'
import { FiCalendar, FiSmartphone, FiUserPlus } from 'react-icons/fi'
import '@/styles/PatientProfilePage.css'

const PatientProfilePage = () => {
	const { patientData, handleGoToTeethForm, handleGoToUpdatePatient } = usePatientProfilePage()
	return (
		<>
			<HeadComponent title={`Perfil de ${patientData.name}`} />
			<Navbar />
			<main className="patientprofile_main">
				<header className="main_header">
					<h1>
						Paciente
						{` ${patientData.name.split(' ')[0]} ${
							patientData.name.split(' ')[2]
								? patientData.name.split(' ')[2]
								: patientData.name.split(' ')[1]
						}`}
					</h1>
					<div className="header_btnGroup">
						<Button
							variant="contained"
							startIcon={<FiUserPlus />}
							onClick={handleGoToUpdatePatient}
						>
							Modificar datos
						</Button>
						<Button
							variant="contained"
							startIcon={<FiCalendar />}
							onClick={handleGoToTeethForm}
						>
							Nueva cita
						</Button>
					</div>
				</header>

				<div className="main_information">
					<article className="information_basicInformation">
						<h2 className="basicInformation_title">Datos personales</h2>
						<div className="basicInformation__info">
							<p className="info_data">
								Nombre completo: <span className="info">{patientData.name}</span>
							</p>
							<p className="info_data">
								Edad: <span className="info">{patientData.age}</span>
							</p>
							<p className="info_data">
								Cumpleaños:{' '}
								<span className="info">
									{patientData.formatBirthdate?.toLocaleUpperCase()}
								</span>
							</p>
							<p className="info_data">
								<FiSmartphone size={24} /> Teléfono:
								<Tooltip title="Llamar">
									<a href={`tel:+${patientData.phone}`} className="info">
										{patientData.phone}
									</a>
								</Tooltip>
							</p>
							<p className="info_data">
								Ocupación: <span className="info">{patientData.occupation}</span>
							</p>
						</div>
					</article>

					<article className="information_additionalInfo">
						<h2 className="additionalInfo_title">Información adicional</h2>
						<div className="additionalInfo_info">
							<div className="info_data info_data_big">
								Alérgias:{' '}
								<div className="info info_big">
									{patientData.allergicReactions
										.split('\n')
										.map((line, index) => (
											<p key={index}>{line}</p>
										))}
								</div>
							</div>

							<div className="info_data info_data_big">
								Tratamiento sistematico actual:{' '}
								<div className="info">
									{patientData.currentSystemicTreatment
										.split('\n')
										.map((line, index) => (
											<p key={index}>{line}</p>
										))}
								</div>
							</div>

							<div className="info_data info_data_big">
								Referencias de laboratorio:{' '}
								<div className="info">
									{patientData.currentSystemicTreatment
										.split('\n')
										.map((line, index) => (
											<p key={index}>{line}</p>
										))}
								</div>
							</div>

							<div className="info_data info_data_big">
								Motivo de consulta:{' '}
								<div className="info info_big">
									{patientData.reason.split('\n').map((line, index) => (
										<p key={index}>{line}</p>
									))}
								</div>
							</div>
						</div>
					</article>
				</div>

				<section className="main_teethTable">
					<h2 className="teethTable_title">Odontograma</h2>
					<TeethTable />
				</section>

				<section className="main_appointments">
					<h2 className="appointments_title">Citas anteriores</h2>
					<AppointmentsTable />
				</section>
			</main>
		</>
	)
}

export default PatientProfilePage
