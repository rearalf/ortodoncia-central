'use client'
import useAppointmentState from '@/states/appointmentsState'
import { useCallback, useEffect, useState } from 'react'
import { constantTeethList } from '@/utils/constants'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import useAlertState from '@/states/useAlertState'
import Appointment from '@/models/Appointment'
import { useRouter } from 'next/navigation'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function usePatientProfilePage(id: string) {
	const router = useRouter()
	const { setTeethList, setToothState, setPositionState, setCompleteOdontogram } = useTeethState()
	const { setPatientData, patientData } = usePatientState()
	const { setAppoinments } = useAppointmentState()
	const { setHandleState } = useAlertState()

	const [loading, setLoading] = useState<boolean>(false)
	const [tabValue, setTabValue] = useState<string>('1')

	const links = [
		{
			link_name: 'Inicio',
			link_to: '/',
		},
		{
			link_name: `Paciente ${patientData.name.split(' ')[0]} ${
				patientData.name.split(' ')[2]
					? patientData.name.split(' ')[2]
					: patientData.name.split(' ')[1]
			}`,
			link_to: `/patient/profile/${patientData.id}`,
		},
	]

	const handleGoToTeethForm = () =>
		router.push('/appointment/create-appointment/' + id, {
			scroll: false,
		})
	const handleGoToUpdatePatient = () =>
		router.push('/patient/profile/' + id + '/update-patient', { scroll: false })
	const handleGoToPhotos = () => {
		router.push(`/photos/${id}`, { scroll: false })
	}

	const handleTabs = (_event: any, newValue: string) => setTabValue(newValue)

	const getPatientData = useCallback(async () => {
		try {
			if (id) {
				setLoading(true)
				const patient = new Patient()
				const data = await patient.getPatient(id)
				if (data !== undefined) {
					setLoading(false)
					setPatientData({
						...data,
						age: getAge(new Date(data.birthdate).toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
					setCompleteOdontogram(data.completeOdontogram)
					if (data.teeth !== undefined) {
						const teeth = JSON.parse(JSON.parse(JSON.stringify(data.teeth)))
						setTeethList(teeth)
					} else {
						setTeethList(constantTeethList)
					}
				}
			}
		} catch (error) {
			setLoading(false)
			console.log('Error getting patient data usePatient: ' + error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al obtener los datos del paciente.',
			})
			router.push('/')
		}
	}, [id, setPatientData, setTeethList, setHandleState, setCompleteOdontogram])

	const getAppointments = useCallback(async () => {
		try {
			if (id) {
				const appointment = new Appointment()
				const allAppointment = await appointment.getAppointmentsByPatient(id)
				const appointmentsList: appointment[] = []
				allAppointment.map(data => {
					const textoFormateado = formatLongText(data.treatment, 40, 2)

					appointmentsList.push({
						...data,
						id_patient: id,
						formatDate: formatDate({ date: data.date }),
						treatment: textoFormateado,
					})
				})
				setAppoinments(appointmentsList)
			}
		} catch (error) {
			console.log('Error getting all apointment: ' + error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al obtener los datos de las citas.',
			})
		}
	}, [id, setAppoinments, setHandleState])

	function formatLongText(text: string, charactersPerLine: number, maxLines: number): string {
		const words: string[] = text.split(' ')
		let lines: string[] = []
		let currentLine: string = ''

		words.forEach(word => {
			if ((currentLine + word).length > charactersPerLine) {
				lines.push(currentLine.trim())
				currentLine = ''
			}
			currentLine += word + ' '
		})

		if (currentLine !== '') {
			lines.push(currentLine.trim())
		}

		lines = lines.slice(0, maxLines)
		if (lines.length === maxLines) {
			lines[maxLines - 1] += '...'
		}

		return lines.join('\n')
	}

	useEffect(() => {
		setTeethList(constantTeethList)
	}, [id, setTeethList])

	useEffect(() => {
		getPatientData()
		setTeethList(constantTeethList)
	}, [id, getPatientData, setTeethList])

	useEffect(() => {
		getAppointments()
	}, [id, getAppointments])

	useEffect(() => {
		setToothState('')
		setPositionState('')
	}, [setToothState, setPositionState])

	return {
		links,
		loading,
		tabValue,
		patientData,
		handleTabs,
		handleGoToPhotos,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	}
}

export default usePatientProfilePage
