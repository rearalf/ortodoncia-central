import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import { useCallback, useEffect } from 'react'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { useNavigate, useParams } from 'react-router-dom'
import formatDate from '@/utils/formatDate'

function usePatientProfilePage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { setPatientData, patientData } = usePatientState()
	const { setTeethList } = useTeethState()

	const handleGoToTeethForm = () => navigate('/teeth-form')

	const getPatientData = useCallback(async () => {
		try {
			if (id) {
				const patient = new Patient()
				const data = await patient.getPatient(id)
				if (data !== undefined) {
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
					if (data.teeth !== undefined) {
						const teeth = JSON.parse(JSON.parse(JSON.stringify(data.teeth)))
						setTeethList(teeth)
					}
				}
			}
		} catch (error) {
			console.log('Error getting patient data usePatient: ' + error)
		}
	}, [id, setPatientData, setTeethList])

	useEffect(() => {
		getPatientData()
	}, [id, getPatientData])

	return {
		patientData,
		handleGoToTeethForm,
	}
}

export default usePatientProfilePage
