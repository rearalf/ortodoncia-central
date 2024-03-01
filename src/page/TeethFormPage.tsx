import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import TeethForm from '@/components/TeethForm'
import { FiSave, FiXCircle } from 'react-icons/fi'
import HeadComponent from '@/components/HeadComponent'
import useTeethFormPage from '@/hooks/useTeethFormPage'
import '@/styles/TeethFormPage.css'

const TeethFormPage = () => {
	const { patientData, handleSaveTeeth, handleCancelButton } = useTeethFormPage()
	return (
		<>
			<HeadComponent title="Dientes de " />
			<Navbar />
			<main className="teethform_main">
				<h1>
					Mapa de dientes de{' '}
					{` ${patientData.name.split(' ')[0]} ${
						patientData.name.split(' ')[2]
							? patientData.name.split(' ')[2]
							: patientData.name.split(' ')[1]
					}`}
				</h1>
				<TeethForm />
				<div className="btn_group">
					<Button
						variant="contained"
						color="success"
						onClick={handleSaveTeeth}
						startIcon={<FiSave />}
					>
						Solo guardar
					</Button>
					<Button
						variant="outlined"
						color="error"
						type="button"
						onClick={handleCancelButton}
						startIcon={<FiXCircle />}
					>
						Cancelar
					</Button>
				</div>
			</main>
		</>
	)
}

export default TeethFormPage
