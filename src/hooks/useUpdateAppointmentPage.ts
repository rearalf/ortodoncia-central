import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import formatDate from '@/utils/formatDate'
import Appointment from '@/models/Appointment'
import { SelectChangeEvent } from '@mui/material'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

function useUpdateAppointmentPage() {
	const navigate = useNavigate()
	const { setHandleState } = useAlertState()
	const { id_patient, id_appointment, last_appointment } = useParams()
	const { patientData, setPatientData } = usePatientState()
	const { appointment, setAppointment, setTeethList } = useTeethState()
	const [staticTeethList, setStaticTeethList] = useState<string>('')
	const [newChanges, setNewChange] = useState<{
		date: Date
		formatDate: string
		reason: string
	}>({
		date: new Date(),
		formatDate: formatDate({ date: new Date() }),
		reason: '',
	})

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

	const handleReasonChangeInputDate = (value: Date | null) => {
		try {
			if (value) {
				setNewChange({
					...newChanges,
					date: value,
					formatDate: formatDate({ date: new Date(value) }),
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleReasonChangeInput = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		try {
			setNewChange({
				...newChanges,
				reason: e.target.value,
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

	const handleSave = async () => {
		try {
			const appointmentClass = new Appointment()
			if (patientData.id && appointment.id) {
				const updateAppoinment = await appointmentClass.updateAppoinment(
					patientData.id,
					appointment.id,
					appointment,
				)

				if (updateAppoinment) {
					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'La actualización de la cita fue exitosa.',
					})
					navigate(`/patient-profile/${patientData.id}/appointment/${appointment.id}`)
				} else {
					throw 'Error updating in update appointment.'
				}
			}
		} catch (error) {
			console.log(error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Ocurrio un error al actualizar.',
			})
		}
	}

	const handleCancel = () => {
		navigate(-1)
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Actualización de la cita cancelada.',
		})
	}

	const getAppointmentData = useCallback(async () => {
		try {
			if (!patientData.id && !appointment.id && id_appointment && id_patient) {
				const appointmentClass = new Appointment()
				const appointmentById = await appointmentClass.getAppointment(
					id_patient,
					id_appointment,
				)
				if (appointmentById) {
					setAppointment({
						...appointmentById,
						date: new Date(
							appointmentById.date.seconds * 1000 +
								appointmentById.date.nanoseconds / 1000000,
						),
						formatDate: formatDate({
							date: new Date(
								appointmentById.date.seconds * 1000 +
									appointmentById.date.nanoseconds / 1000000,
							),
						}),
						id: id_appointment,
					})
					const teeth = JSON.parse(JSON.parse(JSON.stringify(appointmentById.teeth)))
					setTeethList(teeth)
					setStaticTeethList(appointmentById.teeth)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}, [id_appointment, setAppointment, setTeethList, id_patient, appointment.id, patientData.id])

	const getPatientData = useCallback(async () => {
		try {
			const patientClass = new Patient()
			if (!patientData.id && id_patient) {
				const data = await patientClass.getPatient(id_patient)
				if (data !== undefined) {
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
				}
			}
		} catch (error) {
			console.log(error)
		}
	}, [id_patient, setPatientData, patientData.id])

	useEffect(() => {
		getAppointmentData()
		getPatientData()
	}, [id_patient, id_appointment, getPatientData, getAppointmentData])

	return {
		newChanges,
		appointment,
		patientData,
		last_appointment,
		handleSave,
		handleCancel,
		handleChangeCost,
		handleChangeInput,
		handleChangeInputDate,
		handleChangeSelectInput,
		handleReasonChangeInput,
		handleReasonChangeInputDate,
	}
}

export default useUpdateAppointmentPage
