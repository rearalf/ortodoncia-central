import { db } from '@/database/firebase'
import {
	query,
	addDoc,
	orderBy,
	getDocs,
	collection,
	QuerySnapshot,
	OrderByDirection,
	where,
	documentId,
} from 'firebase/firestore'

export enum OrthoTerms {
	SNC = 'SNC',
	SVC = 'SVC',
	SE = 'SE',
	SME = 'SME',
	SR = 'SR',
	SU = 'SU',
	SGU = 'SGU',
	SGI = 'SGI',
}

export const patientBasicData: PatientData = {
	id: '',
	name: '',
	birthdate: new Date(),
	phone: '',
	occupation: '',
	reason: '',
	allergicReactions: '',
	currentSystemicTreatment: '',
	references: '',
	SNC: false,
	SVC: false,
	SE: false,
	SME: false,
	comments1: '',
	SR: false,
	SU: false,
	SGU: false,
	SGI: false,
	comments2: '',
}

class Patient {
	async save(patientData: PatientData, teeth: toothObject[][][]): Promise<string | undefined> {
		try {
			const patient = await addDoc(collection(db, 'patients'), patientData)
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
	): Promise<PatientData[]> {
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
	async getPatient(id: string): Promise<PatientData | undefined> {
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
}

export default Patient
