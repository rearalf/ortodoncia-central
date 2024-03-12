import { sub } from 'date-fns'
import { useEffect } from 'react'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import Patient, { OrthoTerms } from '@/models/Patient'
import { useNavigate, useParams } from 'react-router-dom'

function useUpdatePatientPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { patientData, setPatientData } = usePatientState()
	const { setHandleState } = useAlertState()
	const maxDate = sub(new Date(), {
		years: 1,
	})
	const minDate = sub(new Date(), {
		years: 95,
	})

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

	const handleSaveData = async (e: any) => {
		try {
			e.preventDefault()
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

	useEffect(() => {
		if (id !== undefined) {
			const getPatient = async () => {
				const ModelPatient = new Patient()
				const getPatientData = await ModelPatient.getPatient(id)
				if (getPatientData) {
					setPatientData(getPatientData)
				}
			}
			getPatient()
		}
	}, [id])

	return {
		minDate,
		maxDate,
		patientData,
		handleInput,
		handleSaveData,
		handleChangeDate,
		handleCancelButton,
	}
}

export default useUpdatePatientPage
