import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import formatDate from '@/utils/formatDate'
import Appointment from '@/models/Appointment'
import { SelectChangeEvent } from '@mui/material'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, FormEvent, useCallback, useEffect } from 'react'
import { constantAppointment, constantTeethList } from '@/utils/constants'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { id_patient } = useParams()
	const { setHandleState } = useAlertState()
	const { patientData, setPatientData } = usePatientState()
	const {
		appointment,
		setAppointment,
		teethList,
		setTeethList,
		setToothState,
		setPositionState,
	} = useTeethState()

	const handleSaveTeeth = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (patientData.id) {
				const saveNewAppointment = new Appointment()
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
			console.log('first')
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
				treatment: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeCost = (e: { target: { name: string; value: string } }) => {
		try {
			setAppointment({
				...appointment,
				cost: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const getPatientData = useCallback(async () => {
		try {
			if (id_patient) {
				const patient = new Patient()
				const data = await patient.getPatient(id_patient)
				if (data !== undefined) {
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
					if (data.teeth !== undefined) {
						const teeth = JSON.parse(JSON.parse(JSON.stringify(data.teeth)))
						setTeethList(teeth)
					} else {
						setTeethList(constantTeethList)
					}
				}
			}
		} catch (error) {
			console.log(error)
			navigate(`patient-profile/${id_patient}`)
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Datos del paciente no obtenidos.',
			})
		}
	}, [id_patient, navigate, setHandleState, setTeethList, setPatientData])

	useEffect(() => {
		if (patientData.id === undefined) {
			getPatientData()
		}
	}, [patientData.id, navigate, setHandleState, id_patient, getPatientData])

	useEffect(() => {
		if (appointment.id) setAppointment(constantAppointment)
	}, [])

	return {
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
