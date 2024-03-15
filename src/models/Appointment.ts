import { db } from '@/database/firebase'
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'

class Appointment {
	async getAppointmentsByPatient(
		id: string,
	): Promise<{ id: string; appointment: appointment; teeth: toothObject[][][] }[]> {
		try {
			const appointmentRef = collection(db, 'patients', id, 'appointment')
			const querySnapshot = await getDocs(appointmentRef)

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

	// eslint-disable-next-line
	async getAppointment(id_patient: string, id_appointment: string): Promise<any> {
		try {
			const appointmentRef = doc(db, `patients/${id_patient}/appointment/${id_appointment}`)

			return new Promise((resolve, reject) => {
				const unsubscribe = onSnapshot(
					appointmentRef,
					querySnapshot => {
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

	async updateAppoinment(
		id_patient: string,
		id_appointment: string,
		appointmentData: appointment,
	) {
		try {
			const appointmentRef = doc(db, `patients/${id_patient}/appointment/${id_appointment}`)

			const updateData = await updateDoc(appointmentRef, {
				appointment: {
					date: appointmentData.date,
					treatment: appointmentData.treatment,
					cost: appointmentData.cost,
					doctor: appointmentData.doctor,
					updated_at: serverTimestamp(),
				},
			})
				.then(() => true)
				.catch(() => false)
			return updateData
		} catch (error) {
			console.log('Error updating the appointmnet: ' + error)
			return false
		}
	}
}

export default Appointment
