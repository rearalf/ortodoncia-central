import React from 'react'
import { sub } from 'date-fns'
import InputDate from '../InputDate'
import TeethForm from '../TeethForm'
import InputBasic from '../InputBasic'
import InputCheckbox from '../Checkbox'
import { SlArrowDown } from 'react-icons/sl'
import { FiSave, FiXCircle } from 'react-icons/fi'
import useTeethState from '@/states/toothFormState'
import usePatientState from '@/states/patientState'
import Patient, { OrthoTerms } from '@/models/Patient'
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import './styles.css'

const PatientForm = () => {
	const { patientData, setPatientData } = usePatientState()
	const { teethList } = useTeethState()

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		if (e.target instanceof HTMLInputElement) {
			if (
				e.target.id === OrthoTerms.SNC ||
				e.target.id === OrthoTerms.SE ||
				e.target.id === OrthoTerms.SGI ||
				e.target.id === OrthoTerms.SGU ||
				e.target.id === OrthoTerms.SME ||
				e.target.id === OrthoTerms.SNC ||
				e.target.id === OrthoTerms.SR ||
				e.target.id === OrthoTerms.SU ||
				e.target.id === OrthoTerms.SVC
			)
				setPatientData({
					...patientData,
					[e.target.id]: e.target.value,
				})
			else
				setPatientData({
					...patientData,
					[e.target.id]: e.target.value,
				})
		} else if (e.target instanceof HTMLTextAreaElement)
			setPatientData({
				...patientData,
				[e.target.id]: e.target.value,
			})
	}

	const handleChangeDate = (value: Date | null) => {
		try {
			if (value)
				setPatientData({
					...patientData,
					birthdate: value,
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSaveData = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const newPatient = new Patient()
			newPatient.save(patientData, teethList)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form onSubmit={handleSaveData} className="form_patient">
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
					label="Fecha de nacimiento"
					name="birthdate"
					key="birthdate"
					value={patientData.birthdate}
					onChange={handleChangeDate}
					minDate={sub(new Date(), {
						years: 95,
					})}
					maxDate={sub(new Date(), {
						years: 1,
					})}
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

			<TeethForm />

			<div className="btn_group">
				<Button variant="contained" color="success" type="submit" startIcon={<FiSave />}>
					Guardar
				</Button>
				<Button variant="outlined" color="error" type="button" startIcon={<FiXCircle />}>
					Cancelar
				</Button>
			</div>
		</form>
	)
}

export default PatientForm
