import { db } from '@/database/firebase'
import {
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
	serverTimestamp,
} from 'firebase/firestore'

class PatientPhotos {
	async savePatientPhotos(
		id_patient: string,
		data: AddPhotosInterface,
	): Promise<DocumentReference<DocumentData, DocumentData> | undefined> {
		try {
			const patientRef = collection(db, `patients/${id_patient}/photos`)
			const saveData = await addDoc(patientRef, {
				description: data.description,
				date: data.date,
				imagesLinks: JSON.stringify(data.imagesLinks),
				imagesNames: JSON.stringify(data.imagesNames),
				created_at: serverTimestamp(),
				updated_at: serverTimestamp(),
			})

			return saveData
		} catch (error) {
			console.log('Error al ' + error)
		}
	}
}

export default PatientPhotos
