import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import { useCallback, useEffect, useState } from 'react'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { useNavigate, useParams } from 'react-router-dom'
import formatDate from '@/utils/formatDate'
import { constantTeethList } from '@/utils/constants'
import Appointment from '@/models/Appointment'
import useAppointmentState from '@/states/appointmentsState'
import useAlertState from '@/states/useAlertState'

function usePatientProfilePage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { setTeethList, setToothState, setPositionState } = useTeethState()
	const { setPatientData, patientData } = usePatientState()
	const { setAppoinments } = useAppointmentState()
	const { setHandleState } = useAlertState()
	const [loading, setLoading] = useState<boolean>(false)

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
			link_to: `/patient-profile/${patientData.id}`,
		},
	]

	const handleGoToTeethForm = () => navigate('/teeth-form/' + id)
	const handleGoToUpdatePatient = () => navigate('/update-patient/' + id)
	const handleGoToPhotos = () => navigate(`/patient-profile/${id}/photos`)

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
			navigate('/')
		}
	}, [id, setPatientData, setTeethList, setHandleState, navigate])

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
		patientData,
		handleGoToPhotos,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	}
}

export default usePatientProfilePage
