import Patient from '@/models/Patient'
import usePatientState from '@/states/patientState'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function usePatientProfilePage() {
	const { id } = useParams()
	const { setPatientData, patientData } = usePatientState()

	const handleGoToTeethForm = () => {
		console.log(id)
	}

	const getPatientData = useCallback(async () => {
		try {
			if (id) {
				const patient = new Patient()
				const data = await patient.getPatient(id)
				setPatientData({ ...data })
				console.log(data)
			}
		} catch (error) {
			console.log('Error getting patient data usePatient: ' + error)
		}
	}, [id, setPatientData])

	useEffect(() => {
		getPatientData()
	}, [id, getPatientData])

	return {
		patientData,
		handleGoToTeethForm,
		getPatientData, // Retorna la función getPatientData para ser utilizada fuera del hook
	}
}

export default usePatientProfilePage
