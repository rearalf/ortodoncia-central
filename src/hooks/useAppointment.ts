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
	const { id_patient, id_appointment } = useParams()
	const { patientData, setPatientData } = usePatientState()
	const { appointment, setTeethList, setAppointment } = useTeethState()
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

						format_created_at: formatDate({
							date: new Date(
								appointmentById.created_at.seconds * 1000 +
									appointmentById.created_at.nanoseconds / 1000000,
							),
						}),
						id: id_appointment,
					})

					const teeth = JSON.parse(JSON.parse(JSON.stringify(appointmentById.teeth)))
					setTeethList(teeth)
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

	return {
		patientData,
		appointment,
	}
}

export default useAppointment
