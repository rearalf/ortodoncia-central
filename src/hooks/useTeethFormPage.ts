import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { constantAppointment, constantTeethList } from '@/utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import useAlertState from '@/states/useAlertState'
import useDoctorsState from '@/states/doctosState'
import { SelectChangeEvent } from '@mui/material'
import Appointment from '@/models/Appointment'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'
import Doctors from '@/models/Doctors'

function useTeethFormPage() {
	const navigate = useNavigate()
	const { id_patient } = useParams()
	const { setHandleState } = useAlertState()
	const { patientData, setPatientData } = usePatientState()
	const { doctors, setDoctors } = useDoctorsState()
	const [titleName, setTitleName] = useState('')
	const {
		teethList,
		appointment,
		setTeethList,
		setToothState,
		setAppointment,
		setPositionState,
		setAbutmentTooth,
		setPitFissureSealant,
		setCompleteOdontogram,
	} = useTeethState()

	const [loading, setLoading] = useState<boolean>(false)
	const [steps, setSteps] = useState<number>(1)

	const handleSaveTeeth = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setLoading(true)
			if (patientData.id) {
				const saveNewAppointment = new Appointment()
				const newAppointment = await saveNewAppointment.saveNewAppointment(
					patientData.id,
					appointment,
					teethList,
				)
				if (newAppointment !== undefined) {
					setLoading(false)
					handleCleanStates()
					navigate(-1)
					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Datos de la cita guardados.',
					})
				} else {
					setLoading(false)
					handleCleanStates()
					throw 'Error to saving data'
				}
			}
		} catch (error) {
			setLoading(false)
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
		if (steps === 1) {
			if (patientData.id) navigate(`/patient-profile/${patientData.id}`)
			else navigate('/')
			handleCleanStates()
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Datos no guardados.',
			})
		} else {
			setSteps(1)
		}
	}

	const handleCleanStates = () => {
		setToothState('')
		setPositionState('')
		setAbutmentTooth('')
		setPitFissureSealant('')
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
				setLoading(true)
				const patient = new Patient()
				const data = await patient.getPatient(id_patient)
				if (data !== undefined) {
					setLoading(false)
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
					setTitleName(
						` ${data.name.split(' ')[0]} ${
							data.name.split(' ')[2]
								? data.name.split(' ')[2]
								: data.name.split(' ')[1]
								? data.name.split(' ')[1]
								: ''
						}`,
					)
					setCompleteOdontogram(data.completeOdontogram)
					if (data.teeth !== undefined) {
						const teeth = JSON.parse(JSON.parse(JSON.stringify(data.teeth)))
						setTeethList(teeth)
					} else {
						setTeethList(constantTeethList)
					}
				}
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
			navigate(`patient-profile/${id_patient}`)
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Datos del paciente no obtenidos.',
			})
		}
	}, [id_patient, navigate, setHandleState, setTeethList, setPatientData, setCompleteOdontogram])

	const handleNextStep = () => setSteps(prevStep => prevStep + 1)

	const getDoctors = useCallback(async () => {
		try {
			const doctorsModel = new Doctors()
			const doctorsData = await doctorsModel.getDoctors()
			if (Array.isArray(doctorsData)) setDoctors(doctorsData)
		} catch (error) {
			console.log(error)
		}
	}, [setDoctors])

	useEffect(() => {
		if (patientData.id === undefined) {
			getPatientData()
		} else {
			setTitleName(
				` ${patientData.name.split(' ')[0]} ${
					patientData.name.split(' ')[2]
						? patientData.name.split(' ')[2]
						: patientData.name.split(' ')[1]
						? patientData.name.split(' ')[1]
						: ''
				}`,
			)
		}
	}, [patientData.id, navigate, setHandleState, id_patient, getPatientData, patientData.name])

	useEffect(() => {
		if (appointment.id) setAppointment(constantAppointment)
	}, [appointment.id, setAppointment])

	useEffect(() => {
		getDoctors()
	}, [getDoctors])

	return {
		steps,
		doctors,
		loading,
		titleName,
		appointment,
		patientData,
		handleNextStep,
		handleSaveTeeth,
		handleChangeCost,
		handleChangeInput,
		handleCancelButton,
		handleChangeInputDate,
		handleChangeSelectInput,
	}
}

export default useTeethFormPage
