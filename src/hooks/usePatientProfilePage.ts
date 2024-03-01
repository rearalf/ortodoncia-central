import { useParams } from 'react-router-dom'

function usePatientProfilePage() {
	const { id } = useParams()

	const handleGoToTeethForm = () => {
		console.log(id)
	}

	return {
		handleGoToTeethForm,
	}
}

export default usePatientProfilePage
