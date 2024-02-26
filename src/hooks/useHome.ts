import Patient from '@/models/Patient'
import usePatientsState from '@/states/patientsState'
import { useEffect } from 'react'

function useHome() {
	const { setAllPatients } = usePatientsState()

	useEffect(() => {
		const getAllPatient = async () => {
			try {
				const patientInstance = new Patient()
				const patientsData = await patientInstance.getAllPatients('name', 'asc')

				setAllPatients(patientsData)
			} catch (error) {
				console.log(error)
			}
		}
		getAllPatient()
	}, [setAllPatients])
}

export default useHome
