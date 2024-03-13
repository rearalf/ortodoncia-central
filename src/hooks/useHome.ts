import { ChangeEvent, useEffect, useState } from 'react'
import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import formatDate from '@/utils/formatDate'
import useAlertState from '@/states/useAlertState'
import usePatientsState from '@/states/patientsState'

function useHome() {
	const { setAllPatients } = usePatientsState()
	const { setHandleState } = useAlertState()

	const [search, setSearch] = useState<string>('')

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

	const handleSearchPatient = async () => {
		try {
			if (search.length >= 5) {
				const patientInstance = new Patient()
				const patientsData = await patientInstance.searchPatient(search)

				const patients: PatientData[] = []
				patientsData.map(data => {
					patients.push({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
				})

				if (patients.length > 0) {
					setAllPatients(patients)

					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: `Se encontraron ${patients.length} pacientes.`,
					})
				} else {
					setSearch('')
					setHandleState({
						severity: 'info',
						variant: 'filled',
						show: true,
						text: 'No se encontraron pacientes con ese nombre',
					})
				}
			} else {
				setHandleState({
					severity: 'warning',
					variant: 'outlined',
					show: true,
					text: `Añade más del nombre del paciente.`,
				})
			}
		} catch (error) {
			console.log('' + error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al obtener datos de los pacientes.',
			})
		}
	}

	const handleClearSearchPatient = async () => {
		try {
			try {
				if (search !== '') {
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

					setSearch('')
					setAllPatients(patients)
					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Busqueda limpiada.',
					})
				}
			} catch (error) {
				console.log(error)
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al obtener datos de los pacientes.',
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

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

	return {
		search,
		handleChangeInput,
		handleSearchPatient,
		handleClearSearchPatient,
	}
}

export default useHome
