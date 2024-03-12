import Patient from '@/models/Patient'
import usePatientsState from '@/states/patientsState'
import useAlertState from '@/states/useAlertState'
import formatDate from '@/utils/formatDate'
import getAge from '@/utils/getAge'
import { useEffect } from 'react'

function useHome() {
	const { setAllPatients } = usePatientsState()
	const { setHandleState } = useAlertState()

	useEffect(() => {
		const getAllPatient = async () => {
			try {
				const patientInstance = new Patient()
				const patientsData = await patientInstance.getAllPatients('name', 'asc')

				const patients: PatientData[] = []
				patientsData.map(data => {
					patients.push({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
				})

				setAllPatients(patients)
			} catch (error) {
				console.log(error)
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al obtener datos de los pacientes.',
				})
			}
		}
		getAllPatient()
	}, [setAllPatients, setHandleState])
}

export default useHome
