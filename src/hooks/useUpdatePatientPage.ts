import { sub } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import useAlertState from '@/states/useAlertState'
import useTeethState from '@/states/toothFormState'
import usePatientState from '@/states/patientState'
import Patient, { OrthoTerms } from '@/models/Patient'
import { useEffect } from 'react'

function useUpdatePatientPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { patientData, setPatientData } = usePatientState()
	const { teethList } = useTeethState()
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
					[e.target.id]: e.target.value,
				})
			else
				setPatientData({
					...patientData,
					[e.target.id]: e.target.value.trim(),
				})
		} else if (e.target instanceof HTMLTextAreaElement)
			setPatientData({
				...patientData,
				[e.target.id]: e.target.value.trim(),
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
		if (id !== undefined) {
			const getPatient = async () => {
				const ModelPatient = new Patient()
				const getPatientData = await ModelPatient.getPatient(id)
				console.log(getPatientData)
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
