import { sub } from 'date-fns'
import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { patientData } = usePatientState()
	const { appointment, setAppointment } = useTeethState()
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

	const handleChangeInputDate = (value: Date | null) => {
		try {
			if (value)
				setAppointment({
					...appointment,
					date: value,
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeInput = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		try {
			setAppointment({
				...appointment,
				[e.target.id]: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		// console.log(patientData)
	}, [patientData])

	return {
		maxDate,
		minDate,
		appointment,
		patientData,
		handleSaveTeeth,
		handleChangeInput,
		handleCancelButton,
		handleChangeInputDate,
	}
}

export default useTeethFormPage
