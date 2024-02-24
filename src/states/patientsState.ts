import { patientBasicData } from '@/models/Patient'
import { create } from 'zustand'

interface PatientsStateInterface {
	allPatients: {
		id_patient?: string
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
	}[]
	page: number
	rowsPerPage: number
	setPage: (value: number) => void
	setRowsPerPage: (value: number) => void
	setAllPatients: (value: PatientsStateInterface['allPatients']) => void
}

const usePatientsState = create<PatientsStateInterface>()(set => ({
	allPatients: [],
	rowsPerPage: 5,
	page: 0,
	setPage: (value: number) =>
		set(state => ({
			...state,
			page: value,
		})),
	setAllPatients: value =>
		set(state => ({
			...state,
			allPatients: value,
		})),
	setRowsPerPage: value =>
		set(state => ({
			...state,
			rowsPerPage: value,
		})),
}))

export default usePatientsState
