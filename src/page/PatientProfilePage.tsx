import { FiBookOpen, FiCalendar, FiSmartphone, FiUserPlus } from 'react-icons/fi'
import usePatientProfilePage from '@/hooks/usePatientProfilePage'
import AppointmentsTable from '@/components/AppointmentsTable'
import TeethTable from '@/components/Odontogram/TeethTable'
import BackdropLoading from '@/components/BackdropLoading'
import AvatarComponent from '@/components/AvatarComponent'
import HeadComponent from '@/components/HeadComponent'
import BreadCrumbs from '@/components/BreadCrumbs'
import { Button, Tooltip } from '@mui/material'
import Navbar from '@/components/Navbar'
import '@/styles/PatientProfilePage.css'

const PatientProfilePage = () => {
	const {
		links,
		loading,
		patientData,
		handleGoToPhotos,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	} = usePatientProfilePage()

	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title={`Perfil de ${patientData.name}`} />
			<Navbar />
			<main className="patientprofile_main">
				<BreadCrumbs links={links} />
				<header className="main_header">
					<h1 className="header_title">
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

						<Button
							variant="contained"
							onClick={handleGoToPhotos}
							startIcon={<FiBookOpen />}
						>
							Fotos Expediente
						</Button>
					</div>
				</header>

				<div className="main_information">
					<article className="information_basicInformation">
						<div className="avatar_photo">
							<AvatarComponent
								srcImage={patientData.avatarURL}
								name={`${patientData.name.split(' ')[0]} ${
									patientData.name.split(' ')[2]
										? patientData.name.split(' ')[2]
										: patientData.name.split(' ')[1]
								}`}
							/>
						</div>
						<h2 className="basicInformation_title">Datos personales</h2>
						<div className="basicInformation__info">
							<p className="info_data">
								Nombre: <span className="info">{patientData.name}</span>
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
								Dirección: <span className="info">{patientData.direction}</span>
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
										.map((line, index) =>
											line.length > 0 ? (
												<p key={index}>{line}</p>
											) : (
												<br key={index} />
											),
										)}
								</div>
							</div>

							<div className="info_data info_data_big">
								Tratamiento sistematico actual:{' '}
								<div className="info info_big">
									{patientData.currentSystemicTreatment
										.split('\n')
										.map((line, index) =>
											line.length > 0 ? (
												<p key={index}>{line}</p>
											) : (
												<br key={index} />
											),
										)}
								</div>
							</div>

							<div className="info_data info_data_big">
								Referencias de laboratorio:{' '}
								<div className="info info_big">
									{patientData.currentSystemicTreatment
										.split('\n')
										.map((line, index) =>
											line.length > 0 ? (
												<p key={index}>{line}</p>
											) : (
												<br key={index} />
											),
										)}
								</div>
							</div>

							<div className="info_data info_data_big">
								Motivo de consulta:{' '}
								<div className="info info_big">
									{patientData.reason
										.split('\n')
										.map((line, index) =>
											line.length > 0 ? (
												<p key={index}>{line}</p>
											) : (
												<br key={index} />
											),
										)}
								</div>
							</div>
						</div>
					</article>

					<article className="information_systemic-analysis">
						<h2 className="systemic-analysis_title">Análisis Sistémico</h2>
						<div className="systemic-analysis_content">
							<div className="systemic-analysis_info">
								<p className="info_data">
									SNC:{' '}
									<span className="info">{patientData.SNC ? 'Si' : 'No'}</span>
								</p>
								<p className="info_data">
									SVC:{' '}
									<span className="info">{patientData.SVC ? 'Si' : 'No'}</span>
								</p>
								<p className="info_data">
									SE: <span className="info">{patientData.SE ? 'Si' : 'No'}</span>
								</p>
								<p className="info_data">
									SME:{' '}
									<span className="info">{patientData.SME ? 'Si' : 'No'}</span>
								</p>
								{patientData.comments1.split('\n').map((line, index) => (
									<p key={index}>{line}</p>
								))}
							</div>
							<div className="systemic-analysis_info">
								<p className="info_data">
									SR:{' '}
									<span className="info">{patientData.SNC ? 'Si' : 'No'}</span>
								</p>
								<p className="info_data">
									SU:{' '}
									<span className="info">{patientData.SVC ? 'Si' : 'No'}</span>
								</p>
								<p className="info_data">
									SGU:{' '}
									<span className="info">{patientData.SE ? 'Si' : 'No'}</span>
								</p>
								<p className="info_data">
									SGI:{' '}
									<span className="info">{patientData.SME ? 'Si' : 'No'}</span>
								</p>
								{patientData.comments2.split('\n').map((line, index) => (
									<p key={index}>{line}</p>
								))}
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
