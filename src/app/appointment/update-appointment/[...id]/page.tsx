'use client'
import BackdropLoading from '@/components/BackdropLoading'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import InputDate from '@/components/InputDate'
import InputSelect from '@/components/InputSelect'
import Navbar from '@/components/Navbar'
import InputNumericFormat from '@/components/NumericFormatCustom '
import TeethForm from '@/components/Odontogram/TeethForm'
import TeethTable from '@/components/Odontogram/TeethTable'
import useUpdateAppointmentPage from '@/hooks/useUpdateAppointmentPage'
import styles from '@/styles/UpdateAppointmentPage.module.css'
import { Button } from '@mui/material'
import { FiSave, FiXCircle } from 'react-icons/fi'

function UpdateAppointmentPage({ params }: { params: { id: string[] } }) {
	const {
		links,
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
	} = useUpdateAppointmentPage(params.id[0], params.id[1], params.id[2])

	return (
		<>
			<BackdropLoading loading={loading} />
			<Navbar />
			<main className={styles.main}>
				<BreadCrumbs links={links} />
				<header className={styles.header}>
					<h1 className={styles.title}>{`Modificar cita ${
						patientData.name ? patientData.name.split(' ')[0] : ''
					} ${
						patientData.name
							? patientData.name.split(' ')[2]
								? patientData.name.split(' ')[2]
								: patientData.name.split(' ')[1]
							: ''
					}`}</h1>
					<Button
						variant="contained"
						onClick={handleChangeShowOdonto}
						className={styles.link}
					>
						{showOdontogram ? 'Ver formulario' : 'Ver odontograma'}
					</Button>
				</header>

				{showOdontogram ? (
					<section className={styles.odontograma}>
						<h2 className={styles.title}>Odontograma al finalizar la cita</h2>
						{last_appointment === 'true' ? (
							<TeethForm className1={styles.odontograma_content} className2={styles.teeth_form} />
						) : (
							<TeethTable />
						)}
					</section>
				) : (
					<form className={styles.form}>
						<div className={styles.content}>
							<div className={styles.inputs}>
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
							{last_appointment !== 'true' && (
								<div className={styles.btn_group}>
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
							<section className={styles.form_reason_change}>
								<h2>Razón del cambio</h2>
								<div className={styles.inputs}>
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
								<div className={styles.btn_group}>
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
