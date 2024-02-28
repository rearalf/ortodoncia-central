import useHome from '@/hooks/useHome'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { FiUserPlus } from 'react-icons/fi'
import TablePatient from '@/components/Patient/TablePatient'
import '@/styles/Home.css'

const HomePage = () => {
	useHome()
	return (
		<>
			<Navbar />
			<main className="home_main">
				<div className="main_header">
					<h1>Pacientes</h1>
					<Link to="/create-patient">
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

export default HomePage
