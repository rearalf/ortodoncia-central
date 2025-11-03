import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import formatDate from '@/utils/formatDate'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import Appointment from '@/models/Appointment'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { constantTeethList } from '@/utils/constants'

function useAppointment() {
	const { id_patient, id_appointment, last_appointment } = useParams()
	const { patientData, setPatientData } = usePatientState()
	const {
		appointment,
		setTeethList,
		setAppointment,
		setToothState,
		setCompleteOdontogram,
	} = useTeethState()
	const { setHandleState } = useAlertState()
	const [loading, setLoading] = useState(false)

	const getPatientData = useCallback(async () => {
		try {
			setLoading(true)
			if (!patientData.id && id_patient) {
				const patient = new Patient()
				const data = await patient.getPatient(id_patient)
				if (data !== undefined) {
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
					setCompleteOdontogram(data.completeOdontogram)
				}
			}
		} catch (error) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Ocurrio un error al cargar los datos del paciente.',
			})
		} finally {
			setLoading(false)
		}
	}, [patientData.id, id_patient, setPatientData, setCompleteOdontogram, setHandleState])

	const getAppointment = useCallback(async () => {
		try {
			setLoading(true)
			if (id_patient && id_appointment) {
				const appointment = new Appointment()
				const appointmentById = await appointment.getAppointment(id_patient, id_appointment)

				let addInfoAppointment

				if (appointmentById.dateChange) {
					addInfoAppointment = {
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

						format_created_at: formatDate({
							date: new Date(
								appointmentById.created_at.seconds * 1000 +
									appointmentById.created_at.nanoseconds / 1000000,
							),
						}),
						id: id_appointment,
						dateChange: appointmentById.dateChange,
						formatdateChange: formatDate({
							date: new Date(
								appointmentById.dateChange.seconds * 1000 +
									appointmentById.dateChange.nanoseconds / 1000000,
							),
						}),
						reasonChange: appointmentById.reasonChange,
					}
				} else {
					addInfoAppointment = {
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

						format_created_at: formatDate({
							date: new Date(
								appointmentById.created_at.seconds * 1000 +
									appointmentById.created_at.nanoseconds / 1000000,
							),
						}),
						id: id_appointment,
					}
				}

				if (appointmentById) {
					setAppointment(addInfoAppointment)
					const teeth = JSON.parse(appointmentById.teeth)
					if (typeof teeth !== 'string') {
						setTeethList(teeth)
					} else {
						const teeth1 = JSON.parse(teeth)
						setTeethList(teeth1)
					}
				} else {
					throw new Error('Error getting appointment data')
				}
			} else {
				throw new Error('Error getting appointment data')
			}
		} catch (error) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Ocurrio un error al cargar los datos de la cita.',
			})
		} finally {
			setLoading(false)
		}
	}, [id_appointment, id_patient, setAppointment, setTeethList, setHandleState])

	useEffect(() => {
		setTeethList(constantTeethList)
	}, [setTeethList])

	useEffect(() => {
		getAppointment()
	}, [id_appointment, getAppointment])

	useEffect(() => {
		getPatientData()
	}, [id_patient, getPatientData])

	useEffect(() => {
		setToothState('selectToothEnableEditing')
	}, [setToothState])

	return {
		loading,
		patientData,
		appointment,
		last_appointment,
	}
}

export default useAppointment
