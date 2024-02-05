'use client'
import Checkbox from '@/components/Checkbox'
import InputBasic from '@/components/InputBasic'
import Navbar from '@/components/Navbar'
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import ToothCheckbox from '@/components/teeth/ToothCheckbox'
import React, { useState } from 'react'

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
	const [isChecked, setIsChecked] = useState(false)
	return (
		<>
			<Navbar />
			<main className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12 space-y-8 lg:space-y-12">
				<h1 className="text-4xl font-bold block text-center text-header-1">Formulario</h1>
				<div className="flex flex-col gap-6">
					<InputBasic
						value=""
						required
						id="name"
						key="name"
						type="text"
						label="Nombre completo"
						onChange={() => {}}
					/>
					<InputBasic
						value=""
						required
						id="age"
						key="age"
						type="number"
						label="Edad"
						onChange={() => {}}
					/>
					<InputBasic
						value=""
						id="occupation"
						key="occupation"
						type="text"
						label="Ocupacion"
						onChange={() => {}}
					/>
					<InputBasic
						value=""
						id="phone"
						key="phone"
						type="tel"
						label="Telefono"
						onChange={() => {}}
					/>

					<TextArea
						value=""
						id="reason"
						key="reason"
						label="Motivo de consulta"
						onChange={() => {}}
					/>
					<TextArea
						value=""
						id="currentSystemicTreatment"
						key="currentSystemicTreatment"
						label="tratamiento sistémico actual"
						onChange={() => {}}
					/>

					<div className="flex flex-col">
						<ul className="mb-5">
							<Checkbox
								id="snc"
								key="snc"
								label="SNC"
								checked={true}
								onChange={() => {}}
							/>
							<Checkbox
								id="svc"
								key="svc"
								label="SVC"
								checked={false}
								onChange={() => {}}
							/>
							<Checkbox
								id="se"
								key="se"
								label="SE"
								checked={false}
								onChange={() => {}}
							/>
							<Checkbox
								id="sme"
								key="sme"
								label="SME"
								checked={false}
								isLast
								onChange={() => {}}
							/>
						</ul>
						<TextArea
							value=""
							id="currentSystemicTreatment"
							key="currentSystemicTreatment"
							onChange={() => {}}
						/>
					</div>

					<div className="flex flex-col">
						<ul className="mb-5">
							<Checkbox
								id="sr"
								key="sr"
								label="SR"
								checked={true}
								onChange={() => {}}
							/>
							<Checkbox
								id="su"
								key="su"
								label="SU"
								checked={false}
								onChange={() => {}}
							/>
							<Checkbox
								id="sgu"
								key="sgu"
								label="SGU"
								checked={false}
								onChange={() => {}}
							/>
							<Checkbox
								id="sgi"
								key="sgi"
								label="SGI"
								checked={false}
								isLast
								onChange={() => {}}
							/>
						</ul>
						<TextArea
							value=""
							id="currentSystemicTreatment"
							key="currentSystemicTreatment"
							onChange={() => {}}
						/>
					</div>

					<InputBasic
						value=""
						type="text"
						id="references"
						key="references"
						label="Referencias del laboratorio"
						onChange={() => {}}
					/>
					<div className="grid gap-6 ">
						<div className="flex justify-center w-3/4 m-auto">
							<Select
								optgroup
								id="toothNumber"
								key="toothNumber"
								value=""
								label="Numero de diente"
								onChange={() => {}}
								optionsGroup={teeth}
								options={[]}
							/>
						</div>
						<ToothCheckbox />
					</div>
				</div>
			</main>
		</>
	)
}

export default Home
