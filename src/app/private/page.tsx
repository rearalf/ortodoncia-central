import React from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import { FiUserPlus } from 'react-icons/fi'
import HeadComponent from '@/components/HeadComponent'
import TablePatient from '@/components/Patient/TablePatient'
import '@/styles/private.css'

function Home() {
	return (
		<>
			<HeadComponent />
			<Navbar />
			<main className="main">
				<div className="header">
					<h1>Pacientes</h1>
					<Link href="/private/create-patient">
						<Button variant="contained" startIcon={<FiUserPlus />}>
							Paciente nuevo
						</Button>
					</Link>
				</div>
				<TablePatient />
			</main>
		</>
	)
}

export default Home
