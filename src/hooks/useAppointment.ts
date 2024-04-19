'use client'
import { useCallback, useEffect, useState } from 'react'
import { constantTeethList } from '@/utils/constants'
import useTeethState from '@/states/toothFormState'
import usePatientState from '@/states/patientState'
import useAlertState from '@/states/useAlertState'
import Appointment from '@/models/Appointment'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function useAppointment(id_patient: string, id_appointment: string, last_appointment: string) {
	const { patientData, setPatientData } = usePatientState()
	const {
		appointment,
		setTeethList,
		setAppointment,
		setToothState,
		setPositionState,
		setCompleteOdontogram,
	} = useTeethState()
	const { setHandleState } = useAlertState()
	const [loading, setLoading] = useState(false)

	const links = [
		{
			link_name: 'Inicio',
			link_to: '/',
		},
		{
			link_name: `Paciente ${patientData.name ? patientData.name.split(' ')[0] : ''} ${
				patientData.name
					? patientData.name.split(' ')[2]
						? patientData.name.split(' ')[2]
						: patientData.name.split(' ')[1]
					: ''
			}`,
			link_to: `/patient/profile/${patientData.id}`,
		},
		{
			link_name: `Cita de ${patientData.name ? patientData.name.split(' ')[0] : ''} ${
				patientData.name
					? patientData.name.split(' ')[2]
						? patientData.name.split(' ')[2]
						: patientData.name.split(' ')[1]
					: ''
			}`,
			link_to:
				last_appointment === 'true'
					? `/appointment/${patientData.id}/${appointment.id}/true`
					: `/appointment/${patientData.id}/${appointment.id}/false`,
		},
	]

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
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
			console.log('Error getting patient data usePatient: ' + error)
		}
	}, [id_patient, patientData.id, setPatientData, setCompleteOdontogram])

	const getAppointment = useCallback(async () => {
		try {
			setLoading(true)
			if (id_patient && id_appointment) {
				const appointment = new Appointment()
				const appointmentById = await appointment.getAppointment(id_patient, id_appointment)

				let addInfoAppointment

				if (appointmentById.dateChange) {
					setLoading(false)
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
					setLoading(false)
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
					setLoading(false)
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
			console.log(error)
			setLoading(false)
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
		links,
		loading,
		patientData,
		appointment,
		last_appointment,
	}
}

export default useAppointment
