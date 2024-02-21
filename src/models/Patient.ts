import { db } from '@/database/firebase'
import { addDoc, collection } from 'firebase/firestore'

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
	private id: string | null
	private patientData: PatientData
	private teeth: toothObject[][][]

	constructor(id: string | null, patientData: PatientData, teeth: toothObject[][][]) {
		this.id = id
		this.patientData = patientData
		this.teeth = teeth
	}

	async save(): Promise<string | undefined> {
		try {
			const patient = await addDoc(collection(db, 'patients'), this.patientData)
			if (patient.id) {
				const dbPatient = patient.firestore
				const patientsTeeth = await addDoc(
					collection(dbPatient, `patients/${patient.id}/teeth`),
					{
						teeth: JSON.stringify(this.teeth),
					},
				)
			}
			return patient.id
		} catch (error) {
			console.error('Error saving patient:', error)
		}
	}
}

export default Patient
