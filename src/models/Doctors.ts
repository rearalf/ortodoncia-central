import { db } from '@/database/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'

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
			console.log('Error saving teeth form: ' + error)
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
}

export default Doctors
