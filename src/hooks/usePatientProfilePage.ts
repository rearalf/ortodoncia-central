import Patient from '@/models/Patient'
import usePatientState from '@/states/patientState'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function usePatientProfilePage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { setPatientData, patientData } = usePatientState()

	const handleGoToTeethForm = () => navigate('/teeth-form')

	const getPatientData = useCallback(async () => {
		try {
			if (id) {
				const patient = new Patient()
				const data = await patient.getPatient(id)
				if (data !== undefined) {
					setPatientData({
						...data,
					})
				}
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
	}
}

export default usePatientProfilePage
