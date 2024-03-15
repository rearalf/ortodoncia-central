import Patient from '@/models/Patient'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { OrthoTerms, patientBasicData, maxDate, minDate } from '@/utils/constants'

function useCreatePatient() {
	const navigate = useNavigate()
	const { patientData, setPatientData } = usePatientState()
	const { teethList } = useTeethState()
	const { setHandleState } = useAlertState()

	const handleChangePhone = (
		e: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (typeof e === 'string') {
			setPatientData({
				...patientData,
				phone: e,
			})
		}
	}

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
					[e.target.id]: e.target.checked,
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

	const handleSaveData = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (patientData.name === '') {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe agregar el nombre completo.',
				})
				throw 'Fiel name is empty.'
			}
			if (patientData.phone === '') {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe agregar el número de teléfono.',
				})
				throw 'Fiel phone is empty.'
			}

			const newPatient = new Patient()
			const patient = await newPatient.save(patientData, teethList)
			if (patient !== undefined) {
				setPatientData({
					...patientData,
					id: patient,
				})

				navigate(`/patient-profile/${patient}`)

				setHandleState({
					severity: 'success',
					variant: 'filled',
					show: true,
					text: 'Datos guardados con éxito.',
				})
			} else {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al guardar los datos.',
				})
				throw 'Error creating patient.'
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleCancelButton = () => {
		navigate(-1)
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Creación de paciente cancelada.',
		})
	}

	useEffect(() => {
		setPatientData(patientBasicData)
	}, [setPatientData])

	return {
		minDate,
		maxDate,
		patientData,
		handleInput,
		handleSaveData,
		handleChangeDate,
		handleChangePhone,
		handleCancelButton,
	}
}

export default useCreatePatient
