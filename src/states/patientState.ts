import { create } from 'zustand'
import { constantTeethList, patientBasicData } from '@/utils/constants'

interface PatientStateInterface {
	patientData: PatientDataInterface
	setPatientData: (value: PatientDataInterface) => void
	teeth: Odontogram
	setTeeth: (value: PatientStateInterface['teeth']) => void
}

const usePatientState = create<PatientStateInterface>()(set => ({
	teeth: constantTeethList,
	patientData: patientBasicData,
	setTeeth: value => set(state => ({ ...state, teeth: value })),
	setPatientData: value =>
		set(state => ({
			...state,
			patientData: value,
		})),
}))

export default usePatientState
