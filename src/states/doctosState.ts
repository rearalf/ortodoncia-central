import { create } from 'zustand'

interface doctorsStateInterface {
	doctors: DoctorsInterface[]
	setDoctors: (value: DoctorsInterface[]) => void
}

const useDoctorsState = create<doctorsStateInterface>()(set => ({
	doctors: [],
	setDoctors: value =>
		set(state => ({
			...state,
			doctors: value,
		})),
}))

export default useDoctorsState
