'use client'
import { FiSave, FiUpload, FiXCircle } from 'react-icons/fi'
import PhoneNumberInput from '@/components/PhoneNumberInput'
import AvatarComponent from '@/components/AvatarComponent'
import styles from '@/styles/CreatePatientPage.module.css'
import BackdropLoading from '@/components/BackdropLoading'
import useCreatePatient from '@/hooks/useCreatePatient'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputCheckbox from '@/components/Checkbox'
import InputBasic from '@/components/InputBasic'
import InputDate from '@/components/InputDate'
import { SlArrowDown } from 'react-icons/sl'
import Navbar from '@/components/Navbar'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
} from '@mui/material'

function CreatePatient() {
	const {
		minDate,
		maxDate,
		loading,
		avatarURL,
		patientData,
		loadingPatient,
		handleInput,
		handleSaveData,
		handleCancelFile,
		handleChangeFile,
		handleChangeDate,
		handleChangePhone,
		handleCancelButton,
	} = useCreatePatient()
	return (
		<>
			<BackdropLoading loading={loadingPatient} />
			<Navbar />
			<main className={styles['create_patient-main']}>
				<BreadCrumbs
					links={[
						{
							link_name: 'Inicio',
							link_to: '/',
						},
						{
							link_name: 'Crear paciente',
							link_to: '/create-patient',
						},
					]}
				/>
				<h1 className={styles.title}>Nuevo paciente</h1>
				<form className={styles.form} onSubmit={handleSaveData}>
					<div className={styles.first_section}>
						<div className={styles.avatar_component}>
							{loading && (
								<div className={styles.loading}>
									<CircularProgress />
								</div>
							)}
							<Button aria-label="Agregar foto">
								<label htmlFor="avatar">
									<AvatarComponent
										srcImage={avatarURL}
										name={patientData.name}
										className={styles.avatar}
									/>
								</label>
							</Button>
							<input
								id="avatar"
								name="avatar"
								type="file"
								accept="image/*"
								className={styles.input}
								onChange={handleChangeFile}
								style={{ display: 'none' }}
								multiple={false}
							/>
							<div className={styles.btn_group}>
								<Button variant="contained" className={styles.btn_get_picture}>
									<label htmlFor="avatar" className="upload-label">
										<FiUpload /> Subir imagen
									</label>
									<input
										id="avatar"
										name="avatar"
										type="file"
										accept="image/*"
										className={styles.input}
										onChange={handleChangeFile}
										style={{ display: 'none' }}
										multiple={false}
									/>
								</Button>
								<Button variant="outlined" color="error" onClick={handleCancelFile}>
									Quitar
								</Button>
							</div>
						</div>
						<div className={styles.required_inputs}>
							<InputBasic
								required
								id="name"
								key="name"
								type="text"
								value={patientData.name}
								onChange={handleInput}
								label="Nombre completo"
							/>
							<InputDate
								name="birthdate"
								key="birthdate"
								label="Fecha de nacimiento"
								value={patientData.birthdate}
								onChange={handleChangeDate}
								helperText="MM/DD/YYYY"
								maxDate={maxDate}
								minDate={minDate}
							/>
							<PhoneNumberInput
								required
								key="phone"
								name="phone"
								label="Teléfono"
								value={patientData.phone}
								onChange={handleChangePhone}
							/>
							<InputBasic
								type="text"
								id="direction"
								key="direction"
								label="Dirección"
								value={patientData.direction || ''}
								onChange={handleInput}
							/>
							<InputBasic
								type="text"
								id="occupation"
								key="occupation"
								label="Ocupación"
								value={patientData.occupation || ''}
								onChange={handleInput}
							/>
							<InputCheckbox
								id="completeOdontogram"
								key="completeOdontogram"
								label="Odontograma completo"
								checked={patientData.completeOdontogram}
								onChange={handleInput}
							/>
						</div>
					</div>

					<div className={styles.optional_section}>
						<InputBasic
							multiline
							type="text"
							id="reason"
							key="reason"
							label="Motivo de consulta"
							value={patientData.reason}
							onChange={handleInput}
						/>

						<InputBasic
							multiline
							type="text"
							id="allergicReactions"
							key="allergicReactions"
							label="Reacciones Alérgicas"
							value={patientData.allergicReactions}
							onChange={handleInput}
						/>

						<InputBasic
							multiline
							type="text"
							id="currentSystemicTreatment"
							key="currentSystemicTreatment"
							label="Tratamiento sistémico actual"
							value={patientData.currentSystemicTreatment}
							onChange={handleInput}
						/>
						<InputBasic
							multiline
							type="text"
							id="references"
							key="references"
							label="Referencias del laboratorio"
							value={patientData.references}
							onChange={handleInput}
						/>
					</div>

					<Accordion>
						<AccordionSummary
							expandIcon={<SlArrowDown />}
							aria-controls="systemic-analysis"
							id="systemicAnalysis"
						>
							Analisis Sistémico
						</AccordionSummary>
						<AccordionDetails className={styles.systemic_analysis}>
							<div className="systemic_analysis-content">
								<ul className="contetn-checks">
									<InputCheckbox
										id="SNC"
										key="SNC"
										label="SNC"
										checked={patientData.SNC}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SVC"
										key="SVC"
										label="SVC"
										checked={patientData.SVC}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SE"
										key="SE"
										label="SE"
										checked={patientData.SE}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SME"
										key="SME"
										label="SME"
										checked={patientData.SME}
										onChange={handleInput}
									/>
								</ul>
								<InputBasic
									multiline
									type="text"
									id="comments1"
									key="comments1"
									className={styles.input}
									value={patientData.comments1}
									onChange={handleInput}
								/>
							</div>
							<div className="systemic_analysis-content">
								<ul className="contetn-checks">
									<InputCheckbox
										id="SR"
										key="SR"
										label="SR"
										checked={patientData.SR}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SU"
										key="SU"
										label="SU"
										checked={patientData.SU}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SGU"
										key="SGU"
										label="SGU"
										checked={patientData.SGU}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SGI"
										key="SGI"
										label="SGI"
										checked={patientData.SGI}
										onChange={handleInput}
									/>
								</ul>
								<InputBasic
									multiline
									type="text"
									id="comments2"
									key="comments2"
									className={styles.input}
									value={patientData.comments2}
									onChange={handleInput}
								/>
							</div>
						</AccordionDetails>
					</Accordion>

					<div className={styles.btn_group}>
						<Button
							variant="contained"
							color="success"
							type="submit"
							startIcon={<FiSave />}
						>
							Guardar
						</Button>
						<Button
							variant="outlined"
							color="error"
							type="button"
							onClick={handleCancelButton}
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

export default CreatePatient
