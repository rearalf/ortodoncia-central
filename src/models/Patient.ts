import { db } from '@/database/firebase'
import {
	doc,
	where,
	query,
	addDoc,
	orderBy,
	getDocs,
	updateDoc,
	collection,
	documentId,
	QuerySnapshot,
	serverTimestamp,
	OrderByDirection,
} from 'firebase/firestore'

class Patient {
	async save(
		patientData: PatientDataInterface,
		teeth: toothObject[][][],
	): Promise<string | undefined> {
		try {
			const patient = await addDoc(collection(db, 'patients'), {
				...patientData,
				created_at: serverTimestamp(),
			})
			if (patient.id) {
				const dbPatient = patient.firestore
				await addDoc(collection(dbPatient, `patients/${patient.id}/teeth`), {
					teeth: JSON.stringify(teeth),
				})
			}
			return patient.id
		} catch (error) {
			console.error('Error saving patient:', error)
		}
	}

	async getAllPatients(
		fieldPath: string,
		directionStr: OrderByDirection,
	): Promise<PatientDataInterface[]> {
		try {
			const patientRef = collection(db, 'patients')
			const firstDocument = query(patientRef, orderBy(fieldPath, directionStr))
			const querySnapshot: QuerySnapshot = await getDocs(firstDocument)

			// eslint-disable-next-line
			const patientsData: any[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()
				patientsData.push({
					...data,
					id: doc.id,
					birthdate: new Date(
						data.birthdate.seconds * 1000 + data.birthdate.nanoseconds / 1000000,
					),
				})
			})

			return patientsData
		} catch (error) {
			console.error('Error getting all patient:', error)
			return []
		}
	}

	// eslint-disable-next-line
	async getPatient(id: string): Promise<PatientDataInterface | undefined> {
		try {
			const patientRef = collection(db, 'patients')
			const patientQuery = query(patientRef, where(documentId(), '==', id))
			const querySnapshot: QuerySnapshot = await getDocs(patientQuery)

			// eslint-disable-next-line
			let patientData: any = {}

			querySnapshot.docs
			querySnapshot.forEach(doc => {
				const data = doc.data()
				patientData = {
					...doc.data(),
					id: doc.id,
					birthdate: new Date(
						data.birthdate.seconds * 1000 + data.birthdate.nanoseconds / 1000000,
					),
				}
			})

			return patientData
		} catch (error) {
			console.log('Error getting patient data: ' + error)
			return undefined
		}
	}

	async saveNewAppointment(
		id: string,
		appointment: appointmentInterface,
		teeth: toothObject[][][],
		// eslint-disable-next-line
	): Promise<any | undefined> {
		try {
			const patientRef = doc(db, 'patients', id)
			const patientTeethRef = collection(db, `patients/${id}/appointment`)
			const addData = await addDoc(patientTeethRef, {
				appointment: { ...appointment, created_at: serverTimestamp() },
				teeth: JSON.stringify(teeth),
			})

			if (addData.id) {
				const updatePatient = await updateDoc(patientRef, {
					teeth: JSON.stringify(teeth),
					updated_at: serverTimestamp(),
				})
				console.log(updatePatient)
			}

			return addData
		} catch (error) {
			console.log('Error saving teeth form: ' + error)
			return undefined
		}
	}

	async updatePatient(id: string, patientData: PatientDataInterface): Promise<boolean> {
		try {
			const patientRef = doc(db, 'patients', id)
			const updateData = await updateDoc(patientRef, {
				...patientData,
				updated_at: serverTimestamp(),
			})
				.then(() => true)
				.catch(() => false)
			return updateData
		} catch (error) {
			console.log('Error updating data patient: ' + error)
			return false
		}
	}

	async searchPatient(name: string): Promise<PatientDataInterface[]> {
		try {
			const patientRef = collection(db, 'patients')
			const patientQuery = query(
				patientRef,
				where('name', '>=', name),
				where('name', '<=', name + '\uf8ff'),
			)
			const querySnapshot: QuerySnapshot = await getDocs(patientQuery)

			// eslint-disable-next-line
			const patientsData: any[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()
				patientsData.push({
					...data,
					id: doc.id,
					birthdate: new Date(
						data.birthdate.seconds * 1000 + data.birthdate.nanoseconds / 1000000,
					),
				})
			})

			return patientsData
		} catch (error) {
			console.log('Error searching patients: ' + error)
			return []
		}
	}
}

export default Patient
