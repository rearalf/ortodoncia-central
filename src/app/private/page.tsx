'use client'
import Checkbox from '@/components/Checkbox'
import InputBasic from '@/components/InputBasic'
import Navbar from '@/components/Navbar'
import TextArea from '@/components/TextArea'
import React from 'react'

function Home() {
	return (
		<>
			<Navbar />
			<main className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12 space-y-8 lg:space-y-12">
				<h1 className="text-4xl font-bold block text-center text-header-1">Formulario</h1>
				<form className="flex flex-col gap-6">
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

					<div className='flex flex-col'>
						<ul className='mb-4'>
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
								onChange={() => {}}
							/>
						</ul>
						<InputBasic
							value=""
							type="text"
							id="references"
							key="references"
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
				</form>
			</main>
		</>
	)
}

export default Home
