import Appointment from '@/models/Appointment'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { constantTeethList } from '@/utils/constants'
import formatDate from '@/utils/formatDate'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function useAppointment() {
	const { id } = useParams()
	const { patientData } = usePatientState()
	const { appointment, setTeethList, setAppointment } = useTeethState()
	const [patientName, setPatientName] = useState<string>('')

	useEffect(() => {
		setTeethList(constantTeethList)
	}, [id, setTeethList])

	useEffect(() => {
		const getAppointment = async () => {
			try {
				const appointment = new Appointment()
				if (id && patientData.id) {
					const appointmentById = await appointment.getAppointment(patientData.id, id)
					if (appointmentById) {
						setAppointment({
							...appointmentById.appointment,
							date: new Date(
								appointmentById.appointment.date.seconds * 1000 +
									appointmentById.appointment.date.nanoseconds / 1000000,
							),
							formatDate: formatDate({
								date: new Date(
									appointmentById.appointment.date.seconds * 1000 +
										appointmentById.appointment.date.nanoseconds / 1000000,
								),
							}),
							id,
						})
						const teeth = JSON.parse(JSON.parse(JSON.stringify(appointmentById.teeth)))
						setTeethList(teeth)
						setPatientName(
							`${patientData.name.split(' ')[0]} ${
								patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
							}`,
						)
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
		getAppointment()
	}, [id])

	return {
		patientName,
		appointment,
		patientData,
	}
}

export default useAppointment
