interface PatientDataInterface {
	id?: string
	avatar?: File
	avatarName?: number
	avatarURL?: string
	name: string
	direction: string
	age?: number
	birthdate: Date
	formatBirthdate?: string
	occupation: string
	phone: string
	completeOdontogram: boolean
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
	teeth?: Odontogram | string
}
