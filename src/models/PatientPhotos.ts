import { db } from '@/database/firebase'
import {
	AggregateField,
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
	endBefore,
	getCountFromServer,
	getDocs,
	limit,
	limitToLast,
	orderBy,
	query,
	serverTimestamp,
	startAfter,
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

	async getPhotosByPatient(
		id_patient: string,
		limitValue: number,
	): Promise<
		| {
				dataPhotos: getPhotosByPatientInterface[]
				count: number
		  }
		| undefined
	> {
		try {
			const patientRef = collection(db, `patients/${id_patient}/photos`)
			const count = await getCountFromServer(patientRef)
			const patientQuery = query(patientRef, orderBy('date', 'desc'), limit(limitValue))
			const querySnapshot = await getDocs(patientQuery)

			const dataPhotos: getPhotosByPatientInterface[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()
				if (data !== null) {
					dataPhotos.push({
						id: doc.id,
						date: new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000),
						description: data.description,
						imagesNames: JSON.parse(data.imagesNames),
						imagesLinks: JSON.parse(data.imagesLinks),
						created_at: new Date(
							data.created_at.seconds * 1000 + data.created_at.nanoseconds / 1000000,
						),
						updated_at: new Date(
							data.updated_at.seconds * 1000 + data.updated_at.nanoseconds / 1000000,
						),
					})
				}
			})

			return { dataPhotos, count: count.data().count }
		} catch (error) {
			console.log('Error getting photos by patients')
			return undefined
		}
	}

	async getNextPhotosByPatient(
		id_patient: string,
		limitValue: number,
		startAfterItem: PhotosByPatientInterface,
	) {
		try {
			const patientRef = collection(db, `patients/${id_patient}/photos`)
			const patientQuery = query(
				patientRef,
				orderBy('date', 'desc'),
				startAfter(startAfterItem.date),
				limit(limitValue),
			)
			const querySnapshot = await getDocs(patientQuery)

			const dataPhotos: getPhotosByPatientInterface[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()

				if (data !== null) {
					dataPhotos.push({
						id: doc.id,
						date: new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000),
						description: data.description,
						imagesNames: JSON.parse(data.imagesNames),
						imagesLinks: JSON.parse(data.imagesLinks),
						created_at: new Date(
							data.created_at.seconds * 1000 + data.created_at.nanoseconds / 1000000,
						),
						updated_at: new Date(
							data.updated_at.seconds * 1000 + data.updated_at.nanoseconds / 1000000,
						),
					})
				}
			})

			return dataPhotos
		} catch (error) {
			console.log('Error getting next photos by patients')
			return undefined
		}
	}

	async getEndBeforePhotosByPatient(
		id_patient: string,
		limitValue: number,
		endBeforeItem: PhotosByPatientInterface,
	) {
		try {
			const patientRef = collection(db, `patients/${id_patient}/photos`)
			const patientQuery = query(
				patientRef,
				orderBy('date', 'desc'),
				endBefore(endBeforeItem.date),
				limitToLast(limitValue),
			)
			const querySnapshot = await getDocs(patientQuery)

			const dataPhotos: getPhotosByPatientInterface[] = []

			querySnapshot.forEach(doc => {
				const data = doc.data()
				if (data !== null) {
					dataPhotos.push({
						id: doc.id,
						date: new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000),
						description: data.description,
						imagesNames: JSON.parse(data.imagesNames),
						imagesLinks: JSON.parse(data.imagesLinks),
						created_at: new Date(
							data.created_at.seconds * 1000 + data.created_at.nanoseconds / 1000000,
						),
						updated_at: new Date(
							data.updated_at.seconds * 1000 + data.updated_at.nanoseconds / 1000000,
						),
					})
				}
			})

			return dataPhotos
		} catch (error) {
			console.log('Error getting before photos by patients')
			return undefined
		}
	}
}

export default PatientPhotos
