import { db } from '@/database/firebase'
import {
	doc,
	query,
	limit,
	addDoc,
	orderBy,
	getDocs,
	deleteDoc,
	endBefore,
	collection,
	startAfter,
	limitToLast,
	DocumentData,
	serverTimestamp,
	DocumentReference,
	getCountFromServer,
	where,
	documentId,
	QuerySnapshot,
	updateDoc,
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
		}
	}

	async getOnePhotosByPatient(id_patient: string, id_photo: string) {
		try {
			const photoRef = collection(db, `patients/${id_patient}/photos`)
			const photoQuery = query(photoRef, where(documentId(), '==', id_photo))
			const querySnapshot: QuerySnapshot = await getDocs(photoQuery)

			// eslint-disable-next-line
			let photoData: any = {}

			querySnapshot.forEach(doc => {
				const data = doc.data()
				photoData = {
					...data,
					id: doc.id,
					date: new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000),
					imagesNames: JSON.parse(data.imagesNames),
					imagesLinks: JSON.parse(data.imagesLinks),
					created_at: new Date(
						data.created_at.seconds * 1000 + data.created_at.nanoseconds / 1000000,
					),
					updated_at: new Date(
						data.updated_at.seconds * 1000 + data.updated_at.nanoseconds / 1000000,
					),
				}
			})
			return photoData
		} catch (error) {
			return undefined
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
			return undefined
		}
	}

	async deletePhotosByPhoto(id_patient: string, id_photo: string) {
		try {
			const photoRef = doc(db, `patients/${id_patient}/photos/${id_photo}`)
			const photosDetele = await deleteDoc(photoRef)
				.then(() => true)
				.catch(() => false)
			return photosDetele
		} catch (error) {
			return undefined
		}
	}

	async updatePhotosByPhoto(
		id_patient: string,
		id_photo: string,
		data: {
			imagesNames: string[]
			imagesLinks: string[]
			description: string
		},
	) {
		try {
			const photoRef = doc(db, 'patients', id_patient, 'photos', id_photo)
			const updateData = await updateDoc(photoRef, {
				description: data.description,
				imagesNames: JSON.stringify(data.imagesNames),
				imagesLinks: JSON.stringify(data.imagesLinks),
				updated_at: serverTimestamp(),
			})
				.then(() => true)
				.catch(error => {
					throw new Error(error)
				})
			return updateData
		} catch (error) {
			return false
		}
	}
}

export default PatientPhotos
