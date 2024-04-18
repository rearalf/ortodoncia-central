'use client'
import { FiBookOpen, FiCalendar, FiSmartphone, FiUserPlus } from 'react-icons/fi'
import usePatientProfilePage from '@/hooks/usePatientProfilePage'
import AppointmentsTable from '@/components/AppointmentsTable'
import { Button, Divider, Tab, Tooltip } from '@mui/material'
import styles from '@/styles/PatientProfilePage.module.css'
import TeethTable from '@/components/Odontogram/TeethTable'
import BackdropLoading from '@/components/BackdropLoading'
import AvatarComponent from '@/components/AvatarComponent'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import Navbar from '@/components/Navbar'

function Profile({ params }: { params: { id: string } }) {
	const {
		links,
		loading,
		tabValue,
		patientData,
		handleTabs,
		handleGoToPhotos,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	} = usePatientProfilePage(params.id)

	return (
		<>
			<BackdropLoading loading={loading} />
			<Navbar />
			<main className={styles['patient-profile_main']}>
				<BreadCrumbs links={links} />
				<header className={styles.header}>
					<h1 className={styles.title}>
						Paciente
						{` ${patientData.name ? patientData.name.split(' ')[0] : ''} ${
							patientData.name
								? patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
								: ''
						}`}
					</h1>
					<div className={styles.btn_group}>
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

				<div className={styles.information_patient}>
					<article className={styles.basic_information}>
						<div className={styles.profile}>
							<AvatarComponent
								srcImage={patientData.avatarURL}
								name={`${patientData.name.split(' ')[0]} ${
									patientData.name.split(' ')[2]
										? patientData.name.split(' ')[2]
										: patientData.name.split(' ')[1]
								}`}
								className={styles.avatar}
							/>

							<div className={styles.primary_info}>
								<h3 className={styles.name}>{patientData.name}</h3>
								<div className={styles.more_info}>
									{patientData.age && (
										<p className={styles.info}>{`Edad: ${patientData.age}`}</p>
									)}
									{patientData.formatBirthdate && (
										<p className={styles.info}>
											{`Cumpleaños: ${patientData.formatBirthdate?.toLocaleUpperCase()}`}
										</p>
									)}
									{patientData.occupation && (
										<p className={styles.info}>
											{`Ocupación: ${patientData.occupation}`}
										</p>
									)}
								</div>
							</div>
						</div>

						<div className={styles.aditional}>
							{patientData.direction && (
								<p>{`Dirección: ${patientData.direction}`}</p>
							)}
							<Tooltip title="Llamar" arrow>
								<a className={styles.data_phone} href={`tel:+${patientData.phone}`}>
									<FiSmartphone size={24} />
									{patientData.phone}
								</a>
							</Tooltip>
						</div>
					</article>

					<div className={styles.additional_content}>
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
								<div className={styles.content}>
									<InputBasic
										disabled
										multiline
										type="text"
										id="reason"
										key="reason"
										label="Motivo de consulta"
										value={patientData.reason}
										onChange={() => {}}
										className={styles.content_input}
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
										className={styles.content_input}
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
										className={styles.content_input}
									/>
									<InputBasic
										disabled
										multiline
										type="text"
										id="references"
										key="references"
										onChange={() => {}}
										value={patientData.references}
										className={styles.content_input}
										label="Referencias del laboratorio"
									/>
								</div>
							</TabPanel>
							<TabPanel value="2">
								<div className={styles.systemic_analysis}>
									<div className={styles.content}>
										<p>SNC: {patientData.SNC ? 'Si' : 'No'}</p>
										<p>SVC: {patientData.SVC ? 'Si' : 'No'}</p>
										<p>SE: {patientData.SE ? 'Si' : 'No'}</p>
										<p>SME: {patientData.SME ? 'Si' : 'No'}</p>
										<InputBasic
											disabled
											multiline
											type="text"
											id="comments1"
											key="comments1"
											onChange={() => {}}
											value={patientData.comments1}
											className={styles.content_input}
										/>
									</div>
									<Divider
										orientation="vertical"
										className={styles.divider_vertical}
									/>
									<Divider className={styles.divider_horizontal} />
									<div className={styles.content}>
										<p>SR: {patientData.SNC ? 'Si' : 'No'}</p>
										<p>SU: {patientData.SVC ? 'Si' : 'No'}</p>
										<p>SGU: {patientData.SE ? 'Si' : 'No'}</p>
										<p>SGI: {patientData.SME ? 'Si' : 'No'}</p>
										<InputBasic
											disabled
											multiline
											type="text"
											id="comments2"
											key="comments2"
											value={patientData.comments2}
											onChange={() => {}}
											className={styles.content_input}
										/>
									</div>
								</div>
							</TabPanel>
						</TabContext>
					</div>
				</div>

				<section className={styles.teethTable}>
					<h2 className={styles.title}>Odontograma</h2>
					<TeethTable />
				</section>

				<section className={styles.appointments}>
					<h2 className={styles.title}>Citas anteriores</h2>
					<AppointmentsTable />
				</section>
			</main>
		</>
	)
}

export default Profile
