interface PatientData {
	id?: string
	name: string
	birthdate: Date
	occupation: string
	phone: string
	reason: string
	allergicReactions: string
	currentSystemicTreatment: string
	references: string
	SNC: boolean
	SVC: boolean
	SE: boolean
	SME: boolean
	comments1: string
	SR: boolean
	SU: boolean
	SGU: boolean
	SGI: boolean
	comments2: string
	teeth?: toothObject[][][] | string
}
