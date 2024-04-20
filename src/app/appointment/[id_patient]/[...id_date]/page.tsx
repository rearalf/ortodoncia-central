'use client'
import TeethTable from '@/components/Odontogram/TeethTable'
import BackdropLoading from '@/components/BackdropLoading'
import styles from '@/styles/AppointmentPage.module.css'
import useAppointment from '@/hooks/useAppointment'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import Navbar from '@/components/Navbar'
import { Button } from '@mui/material'
import Link from 'next/link'

function AppointmentPage({ params }: { params: { id_patient: string; id_date: string } }) {
	const { links, loading, appointment, patientData, last_appointment } = useAppointment(
		params.id_patient,
		params.id_date[0],
		params.id_date[1],
	)

	return (
		<>
			<BackdropLoading loading={loading} />
			<Navbar />
			<main className={styles.main}>
				<BreadCrumbs links={links} />
				<header className={styles.header}>
					<h1>
						{`Cita de ${patientData.name ? patientData.name.split(' ')[0] : ''} ${
							patientData.name
								? patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
								: ''
						}`}
					</h1>
					<Link
						className={styles.link}
						href={
							last_appointment === 'true'
								? `/appointment/update-appointment/${patientData.id}/${appointment.id}/true`
								: `/appointment/update-appointment/${patientData.id}/${appointment.id}/false`
						}
						scroll={false}
					>
						<Button variant="contained" className={styles.link}>
							Modificar cita
						</Button>
					</Link>
				</header>

				<div className={styles.content}>
					<article className={styles.appointment}>
						<h2 className={styles.title}>Datos de la cita</h2>
						<div className={styles.appointment_data}>
							{appointment.formatDate && <p>{`Fecha: ${appointment?.formatDate}`}</p>}
							{appointment.cost && <p>{`Costo: ${appointment?.cost}`}</p>}
							{appointment.doctor && <p>{`Doctor: ${appointment?.doctor}`}</p>}
							{appointment.treatment && (
								<InputBasic
									disabled
									multiline
									type="text"
									id="treatment"
									key="treatment"
									label="Tratamiento"
									value={appointment.treatment}
									onChange={() => {}}
								/>
							)}
						</div>
					</article>

					<article className={styles.patient}>
						<h2 className={styles.title}>Información del paciente</h2>
						<div className={styles.patient_data}>
							{patientData.name && <p>{`Nombre: ${patientData.name}`}</p>}
							{patientData.age && <p>{`Edad: ${patientData.age}`}</p>}
							{patientData.formatBirthdate && (
								<p>
									{`Fecha de nacimiento: ${patientData.formatBirthdate?.toLocaleUpperCase()}`}
								</p>
							)}
							{patientData.reason && (
								<InputBasic
									disabled
									multiline
									type="text"
									id="reason"
									key="reason"
									label="Razón"
									value={patientData.reason}
									onChange={() => {}}
								/>
							)}
						</div>
					</article>

					{appointment.formatdateChange && appointment.reasonChange && (
						<article className={styles.odontogram_changes}>
							<h2 className={styles.title}>Cambios en el odontograma</h2>
							<div className={styles.changes_data}>
								{appointment.formatdateChange && (
									<p className="info_data">
										{`Fecha del cambio: ${appointment.formatdateChange.toUpperCase()}`}
									</p>
								)}
								{appointment.reasonChange && (
									<InputBasic
										disabled
										multiline
										type="text"
										id="reasonChange"
										key="reasonChange"
										label="Razón del cambio"
										value={appointment.reasonChange}
										onChange={() => {}}
									/>
								)}
							</div>
						</article>
					)}
				</div>

				<section className={styles.odontograma}>
					<h2 className={styles.title}>Odontograma después de la cita</h2>
					<TeethTable className={styles.odontograma_table} />
				</section>
			</main>
		</>
	)
}

export default AppointmentPage
