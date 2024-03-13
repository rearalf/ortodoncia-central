import { create } from 'zustand'

interface PatientsStateInterface {
	allPatients: {
		id?: string
		name: string
		age?: number
		birthdate: Date
		formatBirthdate?: string
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
	loading: boolean
	rowsPerPage: number
	setPage: (value: number) => void
	setLoading: (value: boolean) => void
	setRowsPerPage: (value: number) => void
	setAllPatients: (value: PatientsStateInterface['allPatients']) => void
}

const usePatientsState = create<PatientsStateInterface>()(set => ({
	page: 0,
	loading: true,
	rowsPerPage: 5,
	allPatients: [],
	setLoading: value =>
		set(state => ({
			...state,
			loading: value,
		})),
	setPage: value =>
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
