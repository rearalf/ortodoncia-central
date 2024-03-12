import { db } from '@/database/firebase'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'

class Appointment {
	async getAppointmentsByPatient(
		id: string,
	): Promise<{ id: string; appointment: appointment; teeth: toothObject[][][] }[]> {
		try {
			const appointmentRef = collection(db, 'patients', id, 'appointment')
			const querySnapshot = await getDocs(appointmentRef)

			// eslint-disable-next-line
			const appointments: {
				id: string
				appointment: appointment
				teeth: toothObject[][][]
			}[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()

				appointments.push({
					id: doc.id,
					appointment: {
						id: doc.id,
						...data.appointment,
						date: new Date(
							data.appointment.date.seconds * 1000 +
								data.appointment.date.nanoseconds / 1000000,
						),
					},
					teeth: data.teeth,
				})
			})

			return appointments
		} catch (error) {
			console.log('Error getting appointments: ' + error)
			return []
		}
	}

	async getAppointment(id_patient: string, id: string): Promise<any> {
		try {
			const appointmentRef = doc(db, `patients/${id_patient}/appointment/${id}`)
			let appointment: any = {}

			return new Promise((resolve, reject) => {
				const unsubscribe = onSnapshot(
					appointmentRef,
					querySnapshot => {
						// Actualizamos el objeto appointment con los datos obtenidos
						appointment = { ...querySnapshot.data() }
						unsubscribe() // Detenemos la escucha del snapshot
						resolve(querySnapshot.data())
					},
					error => {
						console.log('Error getting the appointment: ' + error)
						reject()
					},
				)
			})
		} catch (error) {
			console.log('Error getting the appointmnet: ' + error)
			return {}
		}
	}
}

export default Appointment
