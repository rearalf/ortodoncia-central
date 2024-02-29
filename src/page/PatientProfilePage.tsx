import Navbar from '@/components/Navbar'
import HeadComponent from '@/components/HeadComponent'
import '@/styles/PatientProfilePage.css'

const PatientProfilePage = () => {
	return (
		<>
			<HeadComponent title="Perfil de " />
			<Navbar />
			<main className="patientprofile_main">
				<h1>Nuevo paciente</h1>
			</main>
		</>
	)
}

export default PatientProfilePage
