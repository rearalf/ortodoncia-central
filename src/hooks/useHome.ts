import Patient from '@/models/Patient'
import usePatientsState from '@/states/patientsState'
import formatDate from '@/utils/formatDate'
import getAge from '@/utils/getAge'
import { useEffect } from 'react'

function useHome() {
	const { setAllPatients } = usePatientsState()

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
			}
		}
		getAllPatient()
	}, [setAllPatients])
}

export default useHome
