import { db } from '@/database/firebase'
import { OrderByDirection, collection, getDocs, orderBy, query } from 'firebase/firestore'

class Appointment {
	async getAppointmentsByPatient(
		id: string,
		fieldPath: string,
		directionStr: OrderByDirection,
	): Promise<appointment[]> {
		try {
			const appointmentRef = collection(db, `patients/${id}/appointment`)
			const appointmentQuery = query(appointmentRef, orderBy(fieldPath, directionStr))
			const querySnapshot = await getDocs(appointmentQuery)

			// eslint-disable-next-line
			const appointments: any[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()
				appointments.push({
					...data,
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
