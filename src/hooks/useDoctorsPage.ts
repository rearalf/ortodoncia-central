import Doctors from '@/models/Doctors'
import useDoctorsState from '@/states/doctosState'
import useAlertState from '@/states/useAlertState'
import { FormEvent, useCallback, useEffect, useState } from 'react'

function useDoctorsPage() {
	const [loading, setLoading] = useState(false)
	const {
		allDoctors,
		doctorSelect,
		setAllDoctors,
		setShowModal,
		setAction,
		inputValue,
		setError,
	} = useDoctorsState()
	const { setHandleState } = useAlertState()

	const links = [
		{
			link_name: 'Inicio',
			link_to: '/',
		},
		{
			link_name: 'Doctores',
			link_to: '/doctors',
		},
	]

	const handleOpenCreateForm = () => {
		setShowModal(true)
		setAction('create')
	}

	const handleCreateDoctor = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (inputValue.length > 0) {
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
					setShowModal(false)
					setError({
						error: false,
						helperText: '',
					})
				} else {
					setError({
						error: true,
						helperText: 'Error al crear el doctor.',
					})
					throw new Error('Error al agregar nuevo doctor.')
				}
			} else {
				setError({
					error: true,
					helperText: 'Debe de agregar un nombre.',
				})
			}
		} catch (error) {
			console.log(error)
			setHandleState({
				severity: 'error',
				show: true,
				text: 'Error al crear el doctor.',
				variant: 'filled',
			})
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

	const handleUpdateDoctor = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (inputValue.length > 0) {
				const doctorsModel = new Doctors()
				const newDoctor = await doctorsModel.updateDoctor({
					fullName: inputValue.trim(),
					id: doctorSelect.id,
				})
				if (newDoctor) {
					setHandleState({
						severity: 'success',
						show: true,
						text: 'Doctor actualizado.',
						variant: 'filled',
					})
					getDoctors()
					setShowModal(false)
					setError({
						error: false,
						helperText: '',
					})
				} else {
					setError({
						error: true,
						helperText: 'Error al actualizar el doctor.',
					})
					throw new Error('Error al actualizar doctor.')
				}
			} else {
				setError({
					error: true,
					helperText: 'Debe de actualizar un nombre.',
				})
			}
		} catch (error) {
			setHandleState({
				severity: 'error',
				show: true,
				text: 'Error al actualizar el doctor.',
				variant: 'filled',
			})
		}
	}

	useEffect(() => {
		getDoctors()
	}, [getDoctors])

	return {
		links,
		loading,
		allDoctors,
		handleUpdateDoctor,
		handleCreateDoctor,
		handleOpenCreateForm,
	}
}

export default useDoctorsPage
