import { create } from 'zustand'

interface doctorsStateInterface {
	doctors: DoctorsInterface[]
	setDoctors: (value: DoctorsInterface[]) => void
	page: number
	loading: boolean
	rowsPerPage: number
	allDoctors: DoctorsInterface[]
	doctorSelect: { fullName: string; id: string }
	action: 'edit' | 'create' | 'delete'
	inputValue: string
	showModal: boolean
	error: {
		error: boolean
		helperText: string
	}
	// deleteDoctor: {
	// 	id: string
	// 	showModal: boolean
	// }
	// setDeleteDoctor: (value: { id: string; showModal: boolean }) => void
	setDoctorSelect: (value: { fullName: string; id: string }) => void
	setError: (error: { error: boolean; helperText: string }) => void
	setPage: (value: number) => void
	setLoading: (value: boolean) => void
	setShowModal: (value: boolean) => void
	setInputValue: (value: string) => void
	setRowsPerPage: (value: number) => void
	setAction: (value: 'edit' | 'create' | 'delete') => void
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
	error: {
		error: false,
		helperText: '',
	},
	doctorSelect: {
		fullName: '',
		id: '',
	},
	// deleteDoctor: {
	// 	id: '',
	// 	showModal: false,
	// },
	// setDeleteDoctor: value =>
	// 	set(state => ({
	// 		...state,
	// 		deleteDoctors: {
	// 			id: value.id,
	// 			showModal: value.showModal,
	// 		},
	// 	})),
	setDoctorSelect: value =>
		set(state => ({
			...state,
			doctorSelect: {
				fullName: value.fullName,
				id: value.id,
			},
		})),
	setError: value =>
		set(state => ({
			...state,
			error: {
				error: value.error,
				helperText: value.helperText,
			},
		})),
	setShowModal: value =>
		set(state => ({
			...state,
			inputValue: '',
			showModal: value,
		})),
	setInputValue: value => {
		if (!value.trim().match('^[a-zA-Z ]+$') && value.length > 0) {
			set(state => ({
				...state,
				error: {
					error: true,
					helperText: 'Solo se aceptan letras.',
				},
				inputValue: value,
			}))
		} else {
			set(state => ({
				...state,
				error: {
					error: false,
					helperText: '',
				},
				inputValue: value,
			}))
		}
	},
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
