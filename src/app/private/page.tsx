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
import '@/styles/private.css'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { FiSave, FiXCircle } from 'react-icons/fi'

function Home() {
	const teeth = [
		[
			[
				{ title: '18', value: 18 },
				{ title: '17', value: 17 },
				{ title: '16', value: 16 },
				{ title: '15', value: 15 },
				{ title: '14', value: 14 },
				{ title: '13', value: 13 },
				{ title: '12', value: 12 },
				{ title: '11', value: 11 },
			],

			[
				{ title: '21', value: 21 },
				{ title: '22', value: 22 },
				{ title: '23', value: 23 },
				{ title: '24', value: 24 },
				{ title: '25', value: 25 },
				{ title: '26', value: 26 },
				{ title: '27', value: 27 },
				{ title: '28', value: 28 },
			],
		],

		[
			[
				{ title: '55', value: 55 },
				{ title: '54', value: 54 },
				{ title: '53', value: 53 },
				{ title: '52', value: 52 },
				{ title: '51', value: 51 },
			],

			[
				{ title: '61', value: 61 },
				{ title: '62', value: 62 },
				{ title: '63', value: 63 },
				{ title: '64', value: 64 },
				{ title: '65', value: 65 },
			],
		],

		[
			[
				{ title: '85', value: 85 },
				{ title: '84', value: 84 },
				{ title: '83', value: 83 },
				{ title: '82', value: 82 },
				{ title: '81', value: 81 },
			],

			[
				{ title: '71', value: 71 },
				{ title: '72', value: 72 },
				{ title: '73', value: 73 },
				{ title: '74', value: 74 },
				{ title: '75', value: 75 },
			],
		],

		[
			[
				{ title: '48', value: 48 },
				{ title: '47', value: 47 },
				{ title: '46', value: 46 },
				{ title: '45', value: 45 },
				{ title: '44', value: 44 },
				{ title: '43', value: 43 },
				{ title: '42', value: 42 },
				{ title: '41', value: 41 },
			],
			[
				{ title: '31', value: 31 },
				{ title: '32', value: 32 },
				{ title: '33', value: 33 },
				{ title: '34', value: 34 },
				{ title: '35', value: 35 },
				{ title: '36', value: 36 },
				{ title: '37', value: 37 },
				{ title: '38', value: 38 },
			],
		],
	]

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
					<div></div>
					<TabContext value={tabContext}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList aria-label="Formulario de dientes">
								<Tab label="Lista de dientes" value="1" />
								<Tab label="Estado del diente" value="2" />
								{tooth !== 0 && (
									<Tab label={`Numero de diente = ${tooth}`} value={tooth} />
								)}
							</TabList>
						</Box>
						<TabPanel value="1">
							<div className="teethFirstRow">
								{teeth.map((value, i) => {
									return (
										<div className="teethFirstRow_row" key={`value${i}`}>
											{value.map((number, i) => {
												return (
													<div className="row" key={`row${i}`}>
														{number.map((num, i) => {
															return (
																<Button
																	type="button"
																	variant={
																		tooth === num.value
																			? 'contained'
																			: 'outlined'
																	}
																	key={`button${i}`}
																	onClick={() =>
																		handleToothNumber(num.value)
																	}
																>
																	{num.title}
																</Button>
															)
														})}
													</div>
												)
											})}
										</div>
									)
								})}
							</div>
						</TabPanel>
						<TabPanel value="2">
							<ToothForm
								tooth={tooth}
								stateTooth={stateTooth}
								palatina={palatina}
								distal={distal}
								mesial={mesial}
								vestibular={vestibular}
								oclusal={oclusal}
								disable={tooth === 0}
								handleSaveStates={handleSaveStates}
								statePositionTooth={statePositionTooth}
								handleDeleteStates={handleDeleteStates}
								handleToothPosition={handleToothPosition}
								handleFormControlStatePosition={handleFormControlStatePosition}
								handleFormControlToothStateType={handleFormControlToothStateType}
							/>
						</TabPanel>
					</TabContext>
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
