import { create } from 'zustand'

interface doctorsStateInterface {
	doctors: DoctorsInterface[]
	setDoctors: (value: DoctorsInterface[]) => void
	page: number
	loading: boolean
	rowsPerPage: number
	allDoctors: DoctorsInterface[]
	action: 'edit' | 'create'
	inputValue: string
	showModal: boolean
	setPage: (value: number) => void
	setLoading: (value: boolean) => void
	setShowModal: (value: boolean) => void
	setInputValue: (value: string) => void
	setRowsPerPage: (value: number) => void
	setAction: (value: 'edit' | 'create') => void
	setAllDoctors: (value: DoctorsInterface[]) => void
}

const useDoctorsState = create<doctorsStateInterface>()(set => ({
	doctors: [],
	setDoctors: value =>
		set(state => ({
			...state,
			doctors: value,
		})),
	page: 0,
	action: 'create',
	loading: true,
	rowsPerPage: 5,
	allDoctors: [],
	inputValue: '',
	showModal: false,
	setShowModal: value =>
		set(state => ({
			...state,
			inputValue: '',
			showModal: value,
		})),
	setInputValue: value =>
		set(state => ({
			...state,
			inputValue: value,
		})),
	setLoading: value =>
		set(state => ({
			...state,
			loading: value,
		})),
	setAction: value =>
		set(state => ({
			...state,
			action: value,
		})),
	setPage: value =>
		set(state => ({
			...state,
			page: value,
		})),
	setAllDoctors: value =>
		set(state => ({
			...state,
			allDoctors: value,
		})),
	setRowsPerPage: value =>
		set(state => ({
			...state,
			rowsPerPage: value,
		})),
}))

export default useDoctorsState
