import Navbar from '@/components/Navbar'
import { SlArrowDown } from 'react-icons/sl'
import InputDate from '@/components/InputDate'
import InputBasic from '@/components/InputBasic'
import InputCheckbox from '@/components/Checkbox'
import { FiSave, FiXCircle } from 'react-icons/fi'
import HeadComponent from '@/components/HeadComponent'
import useCreatePatient from '@/hooks/useCreatePatient'
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import '@/styles/CreatePatientPage.css'

const CreatePatientPage = () => {
	const { patientData, handleSaveData, handleInput, handleChangeDate } = useCreatePatient()

	return (
		<>
			<HeadComponent title="Crear paciente" />
			<Navbar />
			<main className="createPatient_main">
				<h1>Nuevo paciente</h1>
				<form className="form_patient">
					<div className="firstPart">
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
							value={patientData.birthdate}
							onChange={handleChangeDate}
						/>

						<InputBasic
							type="text"
							id="occupation"
							key="occupation"
							label="Ocupación"
							value={patientData.occupation || ''}
							onChange={handleInput}
						/>

						<InputBasic
							required
							type="tel"
							id="phone"
							key="phone"
							label="Teléfono"
							value={patientData.phone}
							onChange={handleInput}
						/>
					</div>
					<div className="secondPart">
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
						<AccordionDetails className="systemicAnalysisAccordion">
							<div className="systemicAnalysisAccordionContent">
								<ul className="AccordionContent">
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
									value={patientData.comments1}
									onChange={handleInput}
								/>
							</div>
							<div className="systemicAnalysisAccordionContent">
								<ul className="AccordionContent">
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
									value={patientData.comments2}
									onChange={handleInput}
								/>
							</div>
						</AccordionDetails>
					</Accordion>

					<div className="btn_group">
						<Button
							variant="contained"
							color="success"
							onClick={() => handleSaveData('teethForm')}
							startIcon={<FiSave />}
						>
							Ir al formulario de dientes
						</Button>
						<Button
							variant="contained"
							color="success"
							type="submit"
							onClick={() => handleSaveData('profile')}
							startIcon={<FiSave />}
						>
							Solo guardar
						</Button>
						<Button
							variant="outlined"
							color="error"
							type="button"
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

export default CreatePatientPage
