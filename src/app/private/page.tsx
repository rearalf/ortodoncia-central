'use client'
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { OrthoTerms, patientBasicData } from '@/models/Patient'
import InputCheckbox from '@/components/Checkbox'
import InputBasic from '@/components/InputBasic'
import ToothForm from '@/components/teeth/ToothCheckbox'
import HeadComponent from '@/components/HeadComponent'
import { SlArrowDown } from 'react-icons/sl'
import InputDate from '@/components/InputDate'
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import { FiSave, FiXCircle } from 'react-icons/fi'
import '@/styles/private.css'

function Home() {
	const [tooth, setTooth] = useState<number>(0)

	const [tabContext, setTabContext] = useState<string>('1')

	const [palatina, setPalatina] = useState<toothPositionStateType>('')
	const [distal, setDistal] = useState<toothPositionStateType>('')
	const [mesial, setMesial] = useState<toothPositionStateType>('')
	const [vestibular, setVestibular] = useState<toothPositionStateType>('')
	const [oclusal, setOclusal] = useState<toothPositionStateType>('')

	const [stateTooth, setStateTooth] = useState<toothStateType>('')

	const [teethState, setTeethState] = useState<toothPositionInterface[]>([])

	const [statePositionTooth, setStatePositionTooth] = useState<toothPositionStateType>('')

	/* Patient's state */
	const [patient, setPatient] = useState<Patient>(patientBasicData)

	const handleToothPosition = (e: toothPosition) => {
		if (e === 'palatina') {
			setPalatina(statePositionTooth)
		} else if (e === 'distal') {
			setDistal(statePositionTooth)
		} else if (e === 'mesial') {
			setMesial(statePositionTooth)
		} else if (e === 'oclusal') {
			setOclusal(statePositionTooth)
		} else if (e === 'vestibular') {
			setVestibular(statePositionTooth)
		}
	}

	const handleFormControlStatePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatePositionTooth(e.target.value as toothPositionStateType)
		if (e.target.value !== '') {
			setStateTooth('')
		}
	}

	const handleToothNumber = (number: number) => {
		setTooth(number)
		setTabContext('2')
		const existingToothIndex = teethState.findIndex(item => item.tooth === number)
		if (existingToothIndex !== -1) {
			const toothValue = teethState[existingToothIndex]

			setPalatina(toothValue.palatina)
			setDistal(toothValue.distal)
			setMesial(toothValue.mesial)
			setOclusal(toothValue.oclusal)
			setVestibular(toothValue.vestibular)

			setStateTooth(toothValue.stateTooth)
			console.log(toothValue)
		}
	}

	const handleFormControlToothStateType = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStateTooth(e.target.value as toothStateType)
		if (e.target.value !== '') {
			setPalatina('')
			setDistal('')
			setMesial('')
			setOclusal('')
			setVestibular('')
			setStatePositionTooth('')
		}
	}

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
				setPatient({
					...patient,
					[e.target.id]: e.target.checked,
				})
			else
				setPatient({
					...patient,
					[e.target.id]: e.target.value,
				})
		} else if (e.target instanceof HTMLTextAreaElement)
			setPatient({
				...patient,
				[e.target.id]: e.target.value,
			})
	}

	const handleSaveStates = () => {
		const toothState: toothPositionInterface = {
			tooth,
			stateTooth,
			palatina,
			mesial,
			oclusal,
			distal,
			vestibular,
		}

		const existingToothIndex = teethState.findIndex(item => item.tooth === toothState.tooth)

		setTeethState(prevTeethState => {
			if (existingToothIndex !== -1) {
				const updatedTeethState = [...prevTeethState]
				updatedTeethState[existingToothIndex] = toothState
				return updatedTeethState
			} else {
				return [...prevTeethState, toothState]
			}
		})
		handleDeleteStates()
	}

	const handleDeleteStates = () => {
		setTabContext('1')
		setPalatina('')
		setDistal('')
		setMesial('')
		setOclusal('')
		setVestibular('')
		setTooth(0)
		setStatePositionTooth('')
		setStateTooth('')
	}

	const handleSaveData = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(teethState)
	}

	return (
		<>
			<HeadComponent />
			<Navbar />
			<main className="main">
				<h1>Formulario</h1>
				<form onSubmit={handleSaveData}>
					<div className="firstPart">
						<InputBasic
							required
							id="name"
							key="name"
							type="text"
							value={patient.name}
							onChange={handleInput}
							label="Nombre completo"
						/>

						<InputDate />

						<InputBasic
							type="text"
							id="occupation"
							key="occupation"
							label="Ocupación"
							value={patient.occupation || ''}
							onChange={handleInput}
						/>

						<InputBasic
							required
							type="tel"
							id="phone"
							key="phone"
							label="Teléfono"
							value={patient.phone}
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
							value={patient.reason}
							onChange={handleInput}
						/>

						<InputBasic
							multiline
							type="text"
							id="allergicReactions"
							key="allergicReactions"
							label="Reacciones Alérgicas"
							value={patient.reason}
							onChange={handleInput}
						/>

						<InputBasic
							multiline
							type="text"
							id="currentSystemicTreatment"
							key="currentSystemicTreatment"
							label="Tratamiento sistémico actual"
							value={patient.currentSystemicTreatment || ''}
							onChange={handleInput}
						/>
						<InputBasic
							multiline
							type="text"
							id="references"
							key="references"
							label="Referencias del laboratorio"
							value={patient.references || ''}
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
										checked={patient.SNC}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SVC"
										key="SVC"
										label="SVC"
										checked={patient.SVC}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SE"
										key="SE"
										label="SE"
										checked={patient.SE}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SME"
										key="SME"
										label="SME"
										checked={patient.SME}
										onChange={handleInput}
									/>
								</ul>
								<InputBasic
									multiline
									type="text"
									id="comments1"
									key="comments1"
									value={patient.comments1 || ''}
									onChange={handleInput}
								/>
							</div>
							<div className="systemicAnalysisAccordionContent">
								<ul className="AccordionContent">
									<InputCheckbox
										id="SR"
										key="SR"
										label="SR"
										checked={patient.SR}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SU"
										key="SU"
										label="SU"
										checked={patient.SU}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SGU"
										key="SGU"
										label="SGU"
										checked={patient.SGU}
										onChange={handleInput}
									/>
									<InputCheckbox
										id="SGI"
										key="SGI"
										label="SGI"
										checked={patient.SGI}
										onChange={handleInput}
									/>
								</ul>
								<InputBasic
									multiline
									type="text"
									id="comments2"
									key="comments2"
									value={patient.comments2 || ''}
									onChange={handleInput}
								/>
							</div>
						</AccordionDetails>
					</Accordion>

					<ToothForm />

					<div className="btn_group">
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

export default Home
