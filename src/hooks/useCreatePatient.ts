import React from 'react'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import Patient, { OrthoTerms } from '@/models/Patient'
import { useNavigate } from 'react-router-dom'

function useCreatePatient() {
	const navigate = useNavigate()
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
				setPatientData({
					...patientData,
					[e.target.id]: e.target.value,
				})
			else
				setPatientData({
					...patientData,
					[e.target.id]: e.target.value,
				})
		} else if (e.target instanceof HTMLTextAreaElement)
			setPatientData({
				...patientData,
				[e.target.id]: e.target.value,
			})
	}

	const handleChangeDate = (value: Date | null) => {
		try {
			if (value)
				setPatientData({
					...patientData,
					birthdate: value,
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSaveData = async (direction: 'profile' | 'teethForm') => {
		try {
			const newPatient = new Patient()
			const patient = await newPatient.save(patientData, teethList)
			if (patient !== undefined) {
				setPatientData({
					...patientData,
					id: patient,
				})
				direction === 'profile'
					? navigate(`/patient-profile/${patient}`)
					: navigate(`/teeth-form`)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleCancelButton = () => {
		navigate(-1)
	}

	return {
		patientData,
		handleInput,
		handleSaveData,
		handleChangeDate,
		handleCancelButton,
	}
}

export default useCreatePatient
