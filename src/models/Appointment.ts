import { db } from '@/database/firebase'
import {
	doc,
	query,
	addDoc,
	getDocs,
	orderBy,
	updateDoc,
	collection,
	onSnapshot,
	serverTimestamp,
} from 'firebase/firestore'

class Appointment {
	async saveNewAppointment(
		id: string,
		appointment: appointmentInterface,
		teeth: Odontogram,
		// eslint-disable-next-line
	): Promise<any | undefined> {
		try {
			const patientTeethRef = collection(db, `patients/${id}/appointment`)
			const addData = await addDoc(patientTeethRef, {
				date: appointment.date,
				treatment: appointment.treatment,
				cost: appointment.cost,
				doctor: appointment.doctor,
				teeth: JSON.stringify(teeth),
				created_at: serverTimestamp(),
				updated_at: serverTimestamp(),
			})

			if (addData.id) {
				const patientRef = doc(db, 'patients', id)
				await updateDoc(patientRef, {
					teeth: JSON.stringify(teeth),
					updated_at: serverTimestamp(),
				})
					.then(() => true)
					.catch(() => false)
			}

			return addData
		} catch (error) {
			console.log('Error saving teeth form: ' + error)
			return undefined
		}
	}

	async getAppointmentsByPatient(id: string): Promise<appointment[]> {
		try {
			const appointmentRef = collection(db, 'patients', id, 'appointment')
			const appointmentsQuery = query(appointmentRef, orderBy('date', 'desc'))
			const querySnapshot = await getDocs(appointmentsQuery)

			const appointments: appointment[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()

				appointments.push({
					...data,
					id: doc.id,
					date: new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000),
					treatment: data.treatment,
					cost: data.cost,
					doctor: data.doctor,
					created_at: data.created_at,
					updated_at: data.created_at,
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
		appointmentData: appointment & {
			dateChange?: Date
			reasonChange?: string
		},
	) {
		try {
			const appointmentRef = doc(db, `patients/${id_patient}/appointment/${id_appointment}`)

			let updateAppointment
			if (appointmentData.dateChange && appointmentData.reasonChange) {
				updateAppointment = {
					date: appointmentData.date,
					treatment: appointmentData.treatment,
					cost: appointmentData.cost,
					doctor: appointmentData.doctor,
					teeth: JSON.stringify(appointmentData.teeth),
					created_at: appointmentData.created_at,
					updated_at: serverTimestamp(),
					dateChange: appointmentData.dateChange,
					reasonChange: appointmentData.reasonChange,
				}
			} else {
				updateAppointment = {
					date: appointmentData.date,
					treatment: appointmentData.treatment,
					cost: appointmentData.cost,
					doctor: appointmentData.doctor,
					teeth: appointmentData.teeth,
					created_at: appointmentData.created_at,
					updated_at: serverTimestamp(),
				}
			}

			const updateData = await updateDoc(appointmentRef, updateAppointment)
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
