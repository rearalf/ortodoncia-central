import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import TeethForm from '@/components/TeethForm'
import { FiSave, FiXCircle } from 'react-icons/fi'
import HeadComponent from '@/components/HeadComponent'
import useTeethFormPage from '@/hooks/useTeethFormPage'
import '@/styles/TeethFormPage.css'

const TeethFormPage = () => {
	const { handleSaveTeeth } = useTeethFormPage()
	return (
		<>
			<HeadComponent title="Dientes de " />
			<Navbar />
			<main className="teethform_main">
				<h1>Mapa de dientes de </h1>
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
