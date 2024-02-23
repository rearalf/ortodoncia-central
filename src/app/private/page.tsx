import React from 'react'
import Navbar from '@/components/Navbar'
import HeadComponent from '@/components/HeadComponent'
import PatientForm from '@/components/PatientForm'
import '@/styles/private.css'

function Home() {
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

export default Home
