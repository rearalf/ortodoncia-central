import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import formatDate from '@/utils/formatDate'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import Appointment from '@/models/Appointment'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { constantTeethList } from '@/utils/constants'

function useAppointment() {
	const { id_patient, id_appointment, last_appointment } = useParams()
	const { patientData, setPatientData } = usePatientState()
	const { appointment, setTeethList, setAppointment, setToothState, setPositionState } =
		useTeethState()
	const { setHandleState } = useAlertState()

	const getPatientData = useCallback(async () => {
		try {
			if (!patientData.id && id_patient) {
				const patient = new Patient()
				const data = await patient.getPatient(id_patient)
				if (data !== undefined) {
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
				}
			}
		} catch (error) {
			console.log('Error getting patient data usePatient: ' + error)
		}
	}, [id_patient, patientData.id, setPatientData])

	const getAppointment = useCallback(async () => {
		try {
			if (id_patient && id_appointment) {
				const appointment = new Appointment()
				const appointmentById = await appointment.getAppointment(id_patient, id_appointment)

				/* const informationChanges = {
					
				} */

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
					throw 'Error'
				}
			}
		} catch (error) {
			console.log(error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Ocurrio un error al cargar los datos de la cita.',
			})
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
		setToothState('')
		setPositionState('')
	}, [setToothState, setPositionState])

	return {
		patientData,
		appointment,
		last_appointment,
	}
}

export default useAppointment
