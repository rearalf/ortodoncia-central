import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import { FiUserPlus } from 'react-icons/fi'
import HeadComponent from '@/components/HeadComponent'
import usePatientProfilePage from '@/hooks/usePatientProfilePage'
import '@/styles/PatientProfilePage.css'

const PatientProfilePage = () => {
	const { handleGoToTeethForm } = usePatientProfilePage()
	return (
		<>
			<HeadComponent title="Perfil de " />
			<Navbar />
			<main className="patientprofile_main">
				<h1>Nuevo paciente</h1>
				<Button
					variant="contained"
					startIcon={<FiUserPlus />}
					onClick={handleGoToTeethForm}
				>
					Nueva cita
				</Button>
			</main>
		</>
	)
}

export default PatientProfilePage
