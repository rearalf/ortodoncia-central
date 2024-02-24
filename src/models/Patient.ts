import { db } from '@/database/firebase'
import {
	query,
	addDoc,
	orderBy,
	getDocs,
	collection,
	QuerySnapshot,
	OrderByDirection,
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
	id_patient: '',
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
				const patientsTeeth = await addDoc(
					collection(dbPatient, `patients/${patient.id}/teeth`),
					{
						teeth: JSON.stringify(teeth),
					},
				)
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

			const patientsData: any[] = []

			querySnapshot.forEach(doc => {
				const patientData = doc.data()
				patientsData.push({ ...patientData, id_patient: doc.id })
			})

			return patientsData
		} catch (error) {
			console.error('Error getting all patient:', error)
			return []
		}
	}
}

export default Patient
