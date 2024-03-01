import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import { FiUserPlus } from 'react-icons/fi'
import HeadComponent from '@/components/HeadComponent'
import usePatientProfilePage from '@/hooks/usePatientProfilePage'
import '@/styles/PatientProfilePage.css'

const PatientProfilePage = () => {
	const { patientData, handleGoToTeethForm } = usePatientProfilePage()
	return (
		<>
			<HeadComponent title={`Perfil de ${patientData.name}`} />
			<Navbar />
			<main className="patientprofile_main">
				<header className="main_header">
					<h1>
						Paciente
						{` ${patientData.name.split(' ')[0]} ${
							patientData.name.split(' ')[2]
								? patientData.name.split(' ')[2]
								: patientData.name.split(' ')[1]
						}`}
					</h1>
					<Button
						variant="contained"
						startIcon={<FiUserPlus />}
						onClick={handleGoToTeethForm}
					>
						Nueva cita
					</Button>
				</header>
			</main>
		</>
	)
}

export default PatientProfilePage
