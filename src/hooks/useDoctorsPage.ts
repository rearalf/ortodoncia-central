import Doctors from '@/models/Doctors'
import useDoctorsState from '@/states/doctosState'
import useAlertState from '@/states/useAlertState'
import { FormEvent, useCallback, useEffect, useState } from 'react'

function useDoctorsPage() {
	const [loading, setLoading] = useState(false)
	const { allDoctors, setAllDoctors, setShowModal, setAction, inputValue } = useDoctorsState()
	const { setHandleState } = useAlertState()

	const handleOpenCreateForm = () => {
		setShowModal(true)
		setAction('create')
	}

	const handleCreateDoctor = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (inputValue !== '') {
				const doctorsModel = new Doctors()
				const newDoctor = await doctorsModel.createDoctor(inputValue)
				if (newDoctor) {
					setHandleState({
						severity: 'success',
						show: true,
						text: 'Doctor creado.',
						variant: 'filled',
					})
					getDoctors()
				}
			}
		} catch (error) {
			console.log(error)
			setHandleState({
				severity: 'error',
				show: true,
				text: 'Error al obtener el listado de doctores.',
				variant: 'filled',
			})
		} finally {
			setShowModal(false)
		}
	}

	const getDoctors = useCallback(async () => {
		try {
			setLoading(true)
			const doctorsModel = new Doctors()
			const doctorsData = await doctorsModel.getDoctors()

			if (Array.isArray(doctorsData)) setAllDoctors(doctorsData)
		} catch (error) {
			setHandleState({
				severity: 'error',
				show: true,
				text: 'Error al obtener el listado de doctores.',
				variant: 'filled',
			})
		} finally {
			setLoading(false)
		}
	}, [setAllDoctors, setHandleState])

	useEffect(() => {
		getDoctors()
	}, [getDoctors])

	return {
		loading,
		allDoctors,
		handleCreateDoctor,
		handleOpenCreateForm,
	}
}

export default useDoctorsPage
