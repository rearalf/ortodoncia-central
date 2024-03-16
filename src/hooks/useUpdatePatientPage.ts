import Patient from '@/models/Patient'
import { useCallback, useEffect, useState } from 'react'
import { OrthoTerms, maxDate, minDate } from '@/utils/constants'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import { useNavigate, useParams } from 'react-router-dom'

function useUpdatePatientPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { patientData, setPatientData } = usePatientState()
	const { setHandleState } = useAlertState()
	const [patientName, setPatientName] = useState<string>('')

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

	const handleSaveData = async () => {
		try {
			const newPatient = new Patient()
			if (id !== undefined) {
				const patient = await newPatient.updatePatient(id, patientData)

				if (patient) {
					setPatientData({
						...patientData,
					})

					navigate(`/patient-profile/${id}`)

					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Datos modificados con éxito.',
					})
				} else {
					throw 'Error updating data.'
				}
			}
		} catch (error) {
			console.log(error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al modificar los datos.',
			})
		}
	}

	const handleCancelButton = () => {
		navigate(-1)
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Actualización del paciente cancelada.',
		})
	}

	const getPatient = useCallback(async () => {
		try {
			if (!patientData.id) {
				const ModelPatient = new Patient()
				if (id) {
					const getPatientData = await ModelPatient.getPatient(id)
					if (getPatientData) {
						setPatientData(getPatientData)
						setPatientName(
							`${patientData.name.split(' ')[0]} ${
								patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
							}`,
						)
					}
				} else {
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'Error al obtener los datos.',
					})
				}
			}
		} catch (error) {
			console.log(error)
		}
	}, [id, patientData.name, setPatientData, setHandleState, patientData.id])

	useEffect(() => {
		if (id !== undefined) {
			getPatient()
		}
	}, [id, getPatient])

	return {
		minDate,
		maxDate,
		patientData,
		patientName,
		handleInput,
		handleSaveData,
		handleChangeDate,
		handleChangePhone,
		handleCancelButton,
	}
}

export default useUpdatePatientPage
