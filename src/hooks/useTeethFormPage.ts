import usePatientState from '@/states/patientState'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { patientData } = usePatientState()
	const handleSaveTeeth = () => {
		console.log(patientData.id)
	}

	const handleCancelButton = () => {
		if (patientData.id) navigate(`/patient-profile/${patientData.id}`)
		else navigate('/')
	}

	useEffect(() => {
		console.log(patientData)
	}, [])

	return {
		patientData,
		handleSaveTeeth,
		handleCancelButton,
	}
}

export default useTeethFormPage
