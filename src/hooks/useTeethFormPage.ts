'use client'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { constantAppointment, constantTeethList } from '@/utils/constants'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import useAlertState from '@/states/useAlertState'
import { SelectChangeEvent } from '@mui/material'
import Appointment from '@/models/Appointment'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function useTeethFormPage(id_patient: string) {
	const router = useRouter()
	const { setHandleState } = useAlertState()
	const { patientData, setPatientData } = usePatientState()
	const {
		teethList,
		appointment,
		setTeethList,
		setToothState,
		setAppointment,
		setPositionState,
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
					router.back()
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
			if (patientData.id) router.push(`/patient/profile/${patientData.id}`, { scroll: false })
			else router.back()
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
			router.push(`/patient/profile/${id_patient}`, {
				scroll: false,
			})
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Datos del paciente no obtenidos.',
			})
		}
	}, [id_patient, setHandleState, setTeethList, setPatientData, setCompleteOdontogram])

	const handleNextStep = () => setSteps(prevStep => prevStep + 1)

	useEffect(() => {
		if (patientData.id === undefined) {
			getPatientData()
		}
	}, [patientData.id, setHandleState, id_patient, getPatientData])

	useEffect(() => {
		if (appointment.id) setAppointment(constantAppointment)
	}, [appointment.id, setAppointment])

	return {
		steps,
		loading,
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
