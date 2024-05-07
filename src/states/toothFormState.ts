import { constantAppointment, constantTeethList } from '@/utils/constants'
import { create } from 'zustand'

interface TeethStateInterface {
	teethList: Odontogram
	appointment: appointment
	completeOdontogram: boolean
	setCompleteOdontogram: (value: boolean) => void
	setAppointment: (value: appointment) => void
	setTeethList: (value: TeethStateInterface['teethList']) => void
	toothState: toothStateType
	setToothState: (value: toothStateType) => void
	positionState: toothPositionStateType
	setPositionState: (value: toothPositionStateType) => void
	abutmentToothState: boolean | '' | 'disable'
	setAbutmentTooth: (value: boolean | '' | 'disable') => void
}

const useTeethState = create<TeethStateInterface>()(set => ({
	teethList: constantTeethList,
	appointment: constantAppointment,
	setAppointment: value =>
		set(state => ({
			...state,
			appointment: value,
		})),
	setTeethList: value => set(state => ({ ...state, teethList: value })),
	toothState: '',
	setToothState: value => set(state => ({ ...state, toothState: value })),
	positionState: '',
	setPositionState: value => set(state => ({ ...state, positionState: value })),
	completeOdontogram: false,
	setCompleteOdontogram: value => set(state => ({ ...state, completeOdontogram: value })),
	abutmentToothState: false,
	setAbutmentTooth: value => set(state => ({ ...state, abutmentToothState: value })),
}))

export default useTeethState
