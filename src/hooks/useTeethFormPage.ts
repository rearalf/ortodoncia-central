import { sub } from 'date-fns'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { patientData } = usePatientState()
	const { appointment } = useTeethState()
	const maxDate = sub(new Date(), {
		years: 1,
	})
	const minDate = sub(new Date(), {
		years: 95,
	})

	const handleSaveTeeth = () => {
		console.log(patientData)
	}

	const handleCancelButton = () => {
		if (patientData.id) navigate(`/patient-profile/${patientData.id}`)
		else navigate('/')
	}

	useEffect(() => {
		console.log(patientData)
	}, [patientData])

	return {
		maxDate,
		minDate,
		appointment,
		patientData,
		handleSaveTeeth,
		handleCancelButton,
	}
}

export default useTeethFormPage
