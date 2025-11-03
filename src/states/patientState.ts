import { create } from 'zustand'
import { constantTeethList, patientBasicData } from '@/utils/constants'
import { OdontogramType } from '@/components/Odontogram/type'
import { PatientDataInterface } from '@/interface/Patient'

interface PatientStateInterface {
	patientData: PatientDataInterface
	setPatientData: (value: PatientDataInterface) => void
	teeth: OdontogramType
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
