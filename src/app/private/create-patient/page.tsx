import React from 'react'
import HeadComponent from '@/components/HeadComponent'
import Navbar from '@/components/Navbar'
import PatientForm from '@/components/PatientForm'
import '@/styles/CreatePatient.css'

function CreatePatient() {
	return (
		<>
			<HeadComponent />
			<Navbar />
			<main className="main">
				<h1>Formulario</h1>
				<PatientForm />
			</main>
		</>
	)
}

export default CreatePatient
