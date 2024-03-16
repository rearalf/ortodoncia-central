import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { SelectChangeEvent } from '@mui/material'
import Patient from '@/models/Patient'
import useAlertState from '@/states/useAlertState'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { patientData } = usePatientState()
	const { appointment, setAppointment, teethList, setToothState, setPositionState } =
		useTeethState()
	const { setHandleState } = useAlertState()
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
					handleCleanStates()
					navigate(-1)
					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Datos de la cita guardados.',
					})
				} else {
					handleCleanStates()
					throw 'Error to saving data'
				}
			}
		} catch (error) {
			console.log('Error button teeth form: ' + error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al guardar los datos.',
			})
		}
	}

	const handleCancelButton = () => {
		if (patientData.id) navigate(`/patient-profile/${patientData.id}`)
		else navigate('/')
		handleCleanStates()
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Datos no guardados.',
		})
	}

	const handleCleanStates = () => {
		setToothState('')
		setPositionState('')
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

	useEffect(() => {
		if (patientData.id === undefined) {
			navigate(-1)
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Datos del paciente no obtenidos.',
			})
		}
	}, [patientData.id, navigate, setHandleState])

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
