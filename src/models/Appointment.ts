import { db } from '@/database/firebase'
import { collection, getDocs } from 'firebase/firestore'

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
}

export default Appointment