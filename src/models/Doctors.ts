import { db } from '@/database/firebase'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'

class Doctors {
	async getDoctors(): Promise<DoctorsInterface[] | undefined> {
		try {
			const doctorsRef = collection(db, `doctors`)
			const docs = await getDocs(doctorsRef)

			const doctors: DoctorsInterface[] = []

			docs.docs
			docs.docs.forEach(doc => {
				const data = doc.data()
				doctors.push({
					id: doc.id,
					fullName: data.fullName,
				})
			})

			return doctors
		} catch (error) {
			return undefined
		}
	}

	async createDoctor(fullName: string): Promise<string | undefined> {
		try {
			const doctor = await addDoc(collection(db, 'doctors'), {
				fullName,
			})

			return doctor.id
		} catch (error) {
			return undefined
		}
	}

	async updateDoctor(doctor: { fullName: string; id: string }): Promise<boolean> {
		try {
			const doctorRef = doc(db, 'doctors', doctor.id)
			const updateData = await updateDoc(doctorRef, {
				...doctor,
				updated_at: serverTimestamp(),
			})
				.then(() => true)
				.catch(() => false)
			return updateData
		} catch (error) {
			return false
		}
	}

	async deleteDoctor(doctorId: string): Promise<boolean> {
		try {
			const doctorRef = doc(db, 'doctors', doctorId)
			const doctorDelete = await deleteDoc(doctorRef)
				.then(() => true)
				.catch(() => false)

			return doctorDelete
		} catch (error) {
			return false
		}
	}
}

export default Doctors
