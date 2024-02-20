import { create } from 'zustand'

interface PatientStateInterface {
	patientData: {
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
	}
	setPatientData: (property: string, value: string | Date | number | boolean) => void
}

const usePatientState = create<PatientStateInterface>()(set => ({
	patientData: {
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
	},
	setPatientData: (property, value) =>
		set(state => ({
			...state,
			patientData: {
				...state.patientData,
				[property]: value,
			},
		})),
}))

export default usePatientState
