import React from 'react'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import Patient, { OrthoTerms } from '@/models/Patient'

function useCreatePatient() {
	const { patientData, setPatientData } = usePatientState()
	const { teethList } = useTeethState()

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		if (e.target instanceof HTMLInputElement) {
			if (
				e.target.id === OrthoTerms.SNC ||
				e.target.id === OrthoTerms.SE ||
				e.target.id === OrthoTerms.SGI ||
				e.target.id === OrthoTerms.SGU ||
				e.target.id === OrthoTerms.SME ||
				e.target.id === OrthoTerms.SNC ||
				e.target.id === OrthoTerms.SR ||
				e.target.id === OrthoTerms.SU ||
				e.target.id === OrthoTerms.SVC
			)
				setPatientData(e.target.id, e.target.checked)
			else setPatientData(e.target.id, e.target.value)
		} else if (e.target instanceof HTMLTextAreaElement)
			setPatientData(e.target.id, e.target.value)
	}

	const handleChangeDate = (value: Date | null) => {
		try {
			if (value) setPatientData('birthdate', value)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSaveData = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const newPatient = new Patient()
			newPatient.save(patientData, teethList)
		} catch (error) {
			console.log(error)
		}
	}

	return {
		patientData,
		handleInput,
		handleSaveData,
		handleChangeDate,
	}
}

export default useCreatePatient
