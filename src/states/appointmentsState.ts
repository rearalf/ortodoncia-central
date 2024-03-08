import { create } from 'zustand'

interface AppointmentStateInterface {
	appointments: appointment[]
	setAppoinments: (value: AppointmentStateInterface['appointments']) => void
}

const useAppointmentState = create<AppointmentStateInterface>()(set => ({
	appointments: [],
	setAppoinments: value =>
		set(state => ({
			...state,
			appointments: value,
		})),
}))

export default useAppointmentState
