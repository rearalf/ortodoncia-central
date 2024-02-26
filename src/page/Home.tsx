import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import { FiUserPlus } from 'react-icons/fi'
import useHome from '@/hooks/useHome'
import TablePatient from '@/components/Patient/TablePatient'
import '@/styles/Home.css'

const Home = () => {
	useHome()
	return (
		<>
			<Navbar />
			<main className="home_main">
				<div className="main_header">
					<h1>Pacientes</h1>
					<a href="/create-patient">
						<Button variant="contained" startIcon={<FiUserPlus />}>
							Paciente nuevo
						</Button>
					</a>
				</div>
				<TablePatient />
			</main>
		</>
	)
}

export default Home
