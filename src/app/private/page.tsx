'use client'
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import Checkbox from '@/components/Checkbox'
import InputBasic from '@/components/InputBasic'
import ToothCheckbox from '@/components/teeth/ToothCheckbox'
import { OrthoTerms, patientBasicData } from '@/models/Patient'

function Home() {
	const teeth = [
		{
			group: '',
			options: [
				{ title: '18', value: '18' },
				{ title: '17', value: '17' },
				{ title: '16', value: '16' },
				{ title: '15', value: '15' },
				{ title: '14', value: '14' },
				{ title: '13', value: '13' },
				{ title: '12', value: '12' },
				{ title: '11', value: '11' },
			],
		},
		{
			group: '',
			options: [
				{ title: '21', value: '21' },
				{ title: '22', value: '22' },
				{ title: '23', value: '23' },
				{ title: '24', value: '24' },
				{ title: '25', value: '25' },
				{ title: '26', value: '26' },
				{ title: '27', value: '27' },
				{ title: '28', value: '28' },
			],
		},
		{
			group: '',
			options: [
				{ title: '55', value: '55' },
				{ title: '54', value: '54' },
				{ title: '53', value: '53' },
				{ title: '52', value: '52' },
				{ title: '51', value: '51' },
			],
		},
		{
			group: '',
			options: [
				{ title: '61', value: '61' },
				{ title: '62', value: '62' },
				{ title: '63', value: '63' },
				{ title: '64', value: '64' },
				{ title: '65', value: '65' },
			],
		},
		{
			group: '',
			options: [
				{ title: '85', value: '85' },
				{ title: '84', value: '84' },
				{ title: '83', value: '83' },
				{ title: '82', value: '82' },
				{ title: '81', value: '81' },
			],
		},
		{
			group: '',
			options: [
				{ title: '71', value: '71' },
				{ title: '72', value: '72' },
				{ title: '73', value: '73' },
				{ title: '74', value: '74' },
				{ title: '75', value: '75' },
			],
		},
		{
			group: '',
			options: [
				{ title: '48', value: '48' },
				{ title: '47', value: '47' },
				{ title: '46', value: '46' },
				{ title: '45', value: '45' },
				{ title: '44', value: '44' },
				{ title: '43', value: '43' },
				{ title: '42', value: '42' },
				{ title: '41', value: '41' },
			],
		},
		{
			group: '',
			options: [
				{ title: '31', value: '31' },
				{ title: '32', value: '32' },
				{ title: '33', value: '33' },
				{ title: '34', value: '34' },
				{ title: '35', value: '35' },
				{ title: '36', value: '36' },
				{ title: '37', value: '37' },
				{ title: '38', value: '38' },
			],
		},
	]

	const [tooth, setTooth] = useState<number>(0)

	const [palatina, setPalatina] = useState<toothPositionStateType>('')
	const [distal, setDistal] = useState<toothPositionStateType>('')
	const [mesial, setMesial] = useState<toothPositionStateType>('')
	const [vestibular, setVestibular] = useState<toothPositionStateType>('')
	const [oclusal, setOclusal] = useState<toothPositionStateType>('')

	const [stateTooth, setStateTooth] = useState<toothStateType>('')

	const [teethState, setTeethState] = useState<toothPositionInterface[]>([])

	/* Patient's state */
	const [patient, setPatient] = useState<Patient>(patientBasicData)

	const handleSelectTooth = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTooth(Number(e.target.value))
	}
	const handleToothPosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.id === 'palatina') {
			if (e.target.value === 'decay' || e.target.value === 'filling' || e.target.value === '')
				setPalatina(e.target.value)
		} else if (e.target.id === 'distal') {
			if (e.target.value === 'decay' || e.target.value === 'filling' || e.target.value === '')
				setDistal(e.target.value)
		} else if (e.target.id === 'mesial') {
			if (e.target.value === 'decay' || e.target.value === 'filling' || e.target.value === '')
				setMesial(e.target.value)
		} else if (e.target.id === 'vestibular') {
			if (e.target.value === 'decay' || e.target.value === 'filling' || e.target.value === '')
				setVestibular(e.target.value)
		} else if (e.target.id === 'oclusal') {
			if (e.target.value === 'decay' || e.target.value === 'filling' || e.target.value === '')
				setOclusal(e.target.value)
		} else if (e.target.id === 'state') {
			if (
				e.target.value === 'extraction' ||
				e.target.value === 'extracted' ||
				e.target.value === ''
			) {
				setStateTooth(e.target.value)
				setPalatina('')
				setDistal('')
				setMesial('')
				setVestibular('')
				setOclusal('')
			}
		}
	}
	const handleClearStateTeeth = () => {
		setPalatina('')
		setDistal('')
		setMesial('')
		setVestibular('')
		setOclusal('')
		setStateTooth('')
		setTooth(0)
	}

	const handleStateTeeth = () => {
		const toothData: toothPositionInterface = {
			tooth: tooth,
			distal,
			mesial,
			oclusal,
			palatina,
			vestibular,
			state: stateTooth,
		}
		const teethArray = teethState
		teethArray.push(toothData)
		setTeethState(teethArray)
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

	const handleClean = () => {
		handleClearStateTeeth()
		setPatient(patientBasicData)
	}
	const handleSave = () => {}
	return (
		<>
			<Navbar />
			<main className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12 space-y-8 lg:space-y-12">
				<h1 className="text-4xl font-bold block text-center text-header-1">Formulario</h1>
				<form className="flex flex-col gap-6">
					<InputBasic
						required
						id="name"
						key="name"
						type="text"
						value={patient.name}
						onChange={handleInput}
						label="Nombre completo"
					/>
					<InputBasic
						required
						id="age"
						key="age"
						type="number"
						label="Edad"
						value={patient.age}
						onChange={handleInput}
					/>
					<InputBasic
						type="text"
						id="occupation"
						key="occupation"
						label="Ocupacion"
						value={patient.occupation || ''}
						onChange={handleInput}
					/>
					<InputBasic
						required
						type="tel"
						id="phone"
						key="phone"
						label="Telefono"
						value={patient.phone}
						onChange={handleInput}
					/>

					<TextArea
						id="reason"
						key="reason"
						value={patient.reason}
						label="Motivo de consulta"
						onChange={handleInput}
					/>
					<TextArea
						id="currentSystemicTreatment"
						key="currentSystemicTreatment"
						label="tratamiento sistémico actual"
						value={patient.currentSystemicTreatment || ''}
						onChange={handleInput}
					/>

					<div className="flex flex-col">
						<ul className="mb-5">
							<Checkbox
								id="SNC"
								key="SNC"
								label="SNC"
								checked={patient.SNC}
								onChange={handleInput}
							/>
							<Checkbox
								id="SVC"
								key="SVC"
								label="SVC"
								checked={patient.SVC}
								onChange={handleInput}
							/>
							<Checkbox
								id="SE"
								key="SE"
								label="SE"
								checked={patient.SE}
								onChange={handleInput}
							/>
							<Checkbox
								id="SME"
								key="SME"
								label="SME"
								checked={patient.SME}
								isLast
								onChange={handleInput}
							/>
						</ul>
						<TextArea
							value={patient.comments1 || ''}
							id="comments1"
							key="comments1"
							onChange={handleInput}
						/>
					</div>

					<div className="flex flex-col">
						<ul className="mb-5">
							<Checkbox
								id="SR"
								key="SR"
								label="SR"
								checked={patient.SR}
								onChange={handleInput}
							/>
							<Checkbox
								id="SU"
								key="SU"
								label="SU"
								checked={patient.SU}
								onChange={handleInput}
							/>
							<Checkbox
								id="SGU"
								key="SGU"
								label="SGU"
								checked={patient.SGU}
								onChange={handleInput}
							/>
							<Checkbox
								id="SGI"
								key="SGI"
								label="SGI"
								checked={patient.SGI}
								isLast
								onChange={handleInput}
							/>
						</ul>
						<TextArea
							id="comments2"
							key="comments2"
							value={patient.comments2 || ''}
							onChange={handleInput}
						/>
					</div>

					<InputBasic
						type="text"
						id="references"
						key="references"
						value={patient.references || ''}
						label="Referencias del laboratorio"
						onChange={handleInput}
					/>

					<div className="grid gap-6 ">
						<div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
							<Select
								optgroup
								value={tooth}
								id="toothNumber"
								key="toothNumber"
								label="Numero de diente"
								onChange={handleSelectTooth}
								optionsGroup={teeth}
								options={[]}
							/>
							<div className="flex gap-4 flex-col md:flex-row md:items-end md:justify-center">
								<button
									className="inline-block rounded border border-success-600 bg-success-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-success-600 focus:outline-none focus:ring focus:ring-success-400 focus:border-0 active:text-white active:bg-success-700 transition-colors duration-300 ease-in-out uppercase"
									onClick={handleStateTeeth}
									type="button"
								>
									Guardar Estado
								</button>
								<button
									className="inline-block rounded border border-danger-500 px-12 py-3 text-sm font-medium text-danger-500 hover:bg-danger-500 hover:text-white focus:outline-none focus:ring focus:ring-danger-500 focus:border-danger-500 active:bg-danger-400 transition-colors duration-300 ease-in-out uppercase"
									onClick={handleClearStateTeeth}
									type="button"
								>
									Limpiar
								</button>
							</div>
						</div>
						<ToothCheckbox
							stateTooth={stateTooth}
							palatina={palatina}
							distal={distal}
							mesial={mesial}
							vestibular={vestibular}
							oclusal={oclusal}
							disable={tooth === 0}
							handleToothPosition={handleToothPosition}
						/>
					</div>

					<div className="flex gap-4 flex-col md:flex-row md:items-end md:justify-center">
						<button
							className="inline-block rounded border border-success-600 bg-success-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-success-600 focus:outline-none focus:ring focus:ring-success-400 focus:border-0 active:text-white active:bg-success-700 transition-colors duration-300 ease-in-out uppercase"
							onClick={handleSave}
							type="submit"
						>
							Guardar
						</button>
						<button
							className="inline-block rounded border border-danger-500 px-12 py-3 text-sm font-medium text-danger-500 hover:bg-danger-500 hover:text-white focus:outline-none focus:ring focus:ring-danger-500 focus:border-danger-500 active:bg-danger-400 transition-colors duration-300 ease-in-out uppercase"
							onClick={handleClean}
							type="button"
						>
							Limpiar
						</button>
					</div>
				</form>
			</main>
		</>
	)
}

export default Home
