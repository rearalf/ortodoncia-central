import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import formatDate from '@/utils/formatDate'
import useAlertState from '@/states/useAlertState'
import usePatientsState from '@/states/patientsState'

function useHome() {
	const { setAllPatients, setLoading, loading } = usePatientsState()
	const { setHandleState } = useAlertState()

	const [search, setSearch] = useState<string>('')

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value.toUpperCase())

	const handleSearchPatient = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (search.length >= 5) {
				setLoading(true)
				const patientInstance = new Patient()
				const patientsData = await patientInstance.searchPatient(search)

				const patients: PatientDataInterface[] = []
				patientsData.map(data => {
					patients.push({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
				})

				if (patients.length > 0) {
					setAllPatients(patients)
					setLoading(false)

					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: `Se encontraron ${patients.length} pacientes.`,
					})
				} else {
					setSearch('')
					setLoading(false)
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
					setLoading(true)
					const patientInstance = new Patient()
					const patientsData = await patientInstance.getAllPatients('name', 'asc')

					const patients: PatientDataInterface[] = []
					patientsData.map(data => {
						patients.push({
							...data,
							age: getAge(data.birthdate.toISOString()),
							formatBirthdate: formatDate({ date: data.birthdate }),
						})
					})

					setSearch('')
					setLoading(false)
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
				setLoading(true)
				const patientInstance = new Patient()
				const patientsData = await patientInstance.getAllPatients('name', 'asc')

				const patients: PatientDataInterface[] = []
				patientsData.map(data => {
					patients.push({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
				})

				setLoading(false)
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
	}, [setAllPatients, setHandleState, setLoading])

	return {
		search,
		loading,
		handleChangeInput,
		handleSearchPatient,
		handleClearSearchPatient,
	}
}

export default useHome
