import { constantAppointment, constantTeethList } from '@/utils/constants'
import { create } from 'zustand'

interface TeethStateInterface {
	teethList: toothObject[][][]
	appointment: appointment
	setAppointment: (value: appointment) => void
	setTeethList: (value: TeethStateInterface['teethList']) => void
	toothState: toothStateType
	setToothState: (value: toothStateType) => void
	positionState: toothPositionStateType
	setPositionState: (value: toothPositionStateType) => void
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
}))

export default useTeethState
