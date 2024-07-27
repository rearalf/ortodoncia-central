import { FiBookOpen, FiCalendar, FiSmartphone, FiUserPlus } from 'react-icons/fi'
import usePatientProfilePage from '@/hooks/usePatientProfilePage'
import AppointmentsTable from '@/components/AppointmentsTable'
import { Button, Divider, Tab, Tooltip } from '@mui/material'
import TeethTable from '@/components/Odontogram/TeethTable'
import BackdropLoading from '@/components/BackdropLoading'
import AvatarComponent from '@/components/AvatarComponent'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import HeadComponent from '@/components/HeadComponent'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import Navbar from '@/components/Navbar'
import '@/styles/PatientProfilePage.css'

const PatientProfilePage = () => {
	const {
		links,
		loading,
		tabValue,
		titleName,
		patientData,
		handleTabs,
		handleGoToPhotos,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	} = usePatientProfilePage()

	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title={`Perfil de ${patientData.name}`} />
			<Navbar />
			<main className="patient_profile-main">
				<BreadCrumbs links={links} />
				<header className="main_header">
					<h1 className="header_title">Paciente {titleName}</h1>
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

				<div className="main-information_patient">
					<article className="information_patient-basic_information">
						<div className="basic_information-profile">
							<AvatarComponent
								srcImage={patientData.avatarURL}
								name={!loading ? titleName : ''}
							/>

							<div className="profile-primary_info">
								<h3 className="primary_info-name">{patientData.name}</h3>
								<div className="primary_info-more_info">
									{patientData.age && (
										<p className="more_info-info">{`Edad: ${patientData.age}`}</p>
									)}
									{patientData.formatBirthdate && (
										<p className="more_info-info">
											{`Cumpleaños: ${patientData.formatBirthdate?.toLocaleUpperCase()}`}
										</p>
									)}
									{patientData.occupation && (
										<p className="more_info-info">
											{`Ocupación: ${patientData.occupation}`}
										</p>
									)}
								</div>
							</div>
						</div>

						<div className="basic_information-aditional">
							{patientData.direction && (
								<p className="aditional-data">{`Dirección: ${patientData.direction}`}</p>
							)}
							<Tooltip title="Llamar" arrow>
								<a
									className="aditional-data_phone"
									href={`tel:+${patientData.phone}`}
								>
									<FiSmartphone size={24} />
									{patientData.phone}
								</a>
							</Tooltip>
						</div>
					</article>

					<div className="information_patient-additional_content">
						<TabContext value={tabValue}>
							<TabList
								onChange={handleTabs}
								aria-label="Más información del paciente"
								variant="scrollable"
								scrollButtons="auto"
								allowScrollButtonsMobile
							>
								<Tab label="Información adicional" value="1" />
								<Tab label="Análisis Sistémico" value="2" />
							</TabList>

							<TabPanel value="1">
								<div className="additional_content-content">
									<InputBasic
										disabled
										multiline
										type="text"
										id="reason"
										key="reason"
										label="Motivo de consulta"
										value={patientData.reason}
										onChange={() => {}}
									/>

									<InputBasic
										disabled
										multiline
										type="text"
										id="allergicReactions"
										key="allergicReactions"
										label="Reacciones Alérgicas"
										value={patientData.allergicReactions}
										onChange={() => {}}
									/>

									<InputBasic
										disabled
										multiline
										type="text"
										id="currentSystemicTreatment"
										key="currentSystemicTreatment"
										label="Tratamiento sistémico actual"
										value={patientData.currentSystemicTreatment}
										onChange={() => {}}
									/>
									<InputBasic
										disabled
										multiline
										type="text"
										id="references"
										key="references"
										label="Referencias del laboratorio"
										value={patientData.references}
										onChange={() => {}}
									/>
								</div>
							</TabPanel>
							<TabPanel value="2">
								<div className="additional_content-systemic_analysis">
									<div className="systemic_analysis-content">
										<p className="info_data">
											SNC: {patientData.SNC ? 'Si' : 'No'}
										</p>
										<p className="info_data">
											SVC: {patientData.SVC ? 'Si' : 'No'}
										</p>
										<p className="info_data">
											SE: {patientData.SE ? 'Si' : 'No'}
										</p>
										<p className="info_data">
											SME: {patientData.SME ? 'Si' : 'No'}
										</p>
										<InputBasic
											disabled
											multiline
											type="text"
											id="comments1"
											key="comments1"
											value={patientData.comments1}
											onChange={() => {}}
										/>
									</div>
									<Divider
										orientation="vertical"
										className="content-divider_vertical"
									/>
									<Divider className="content-divider_horizontal" />
									<div className="systemic_analysis-content">
										<p className="info_data">
											SR: {patientData.SNC ? 'Si' : 'No'}
										</p>
										<p className="info_data">
											SU: {patientData.SVC ? 'Si' : 'No'}
										</p>
										<p className="info_data">
											SGU: {patientData.SE ? 'Si' : 'No'}
										</p>
										<p className="info_data">
											SGI: {patientData.SME ? 'Si' : 'No'}
										</p>
										<InputBasic
											disabled
											multiline
											type="text"
											id="comments2"
											key="comments2"
											value={patientData.comments2}
											onChange={() => {}}
										/>
									</div>
								</div>
							</TabPanel>
						</TabContext>
					</div>
				</div>

				<section className="main_teethTable">
					<h2 className="teethTable_title">Odontograma</h2>
					<TeethTable enableButton={false} />
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
