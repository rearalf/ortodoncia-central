import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { SelectChangeEvent } from '@mui/material'
import Patient from '@/models/Patient'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { patientData } = usePatientState()
	const { appointment, setAppointment, teethList } = useTeethState()
	const maxDate = new Date()
	const minDate = new Date()

	const handleSaveTeeth = async () => {
		try {
			if (patientData.id) {
				const saveNewAppointment = new Patient()
				const newAppointment = await saveNewAppointment.saveNewAppointment(
					patientData.id,
					appointment,
					teethList,
				)
				if (newAppointment !== undefined) {
					console.log(newAppointment)
					navigate(-1)
				}
			}
		} catch (error) {
			console.log('Error button teeth form: ' + error)
		}
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

	const handleChangeSelectInput = (e: SelectChangeEvent<string>) => {
		try {
			setAppointment({
				...appointment,
				doctor: e.target.value,
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

	const handleChangeCost = (e: { target: { name: string; value: string } }) => {
		try {
			setAppointment({
				...appointment,
				[e.target.name]: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return {
		maxDate,
		minDate,
		appointment,
		patientData,
		handleSaveTeeth,
		handleChangeCost,
		handleChangeInput,
		handleCancelButton,
		handleChangeInputDate,
		handleChangeSelectInput,
	}
}

export default useTeethFormPage
