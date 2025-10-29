import useAppointmentState from '@/states/appointmentsState'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { constantTeethList } from '@/utils/constants'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import useAlertState from '@/states/useAlertState'
import Appointment from '@/models/Appointment'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function usePatientProfilePage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const {
		setTeethList,
		setToothState,
		setPositionState,
		setAbutmentTooth,
		setPitFissureSealant,
		setCompleteOdontogram,
	} = useTeethState()
	const { setPatientData, patientData } = usePatientState()
	const { setAppoinments } = useAppointmentState()
	const { setHandleState } = useAlertState()

	const [loading, setLoading] = useState<boolean>(false)
	const [tabValue, setTabValue] = useState<string>('1')
	const [titleName, setTitleName] = useState('')

	const links = [
		{
			link_name: 'Inicio',
			link_to: '/',
		},
		{
			link_name: `Paciente ${titleName}`,
			link_to: `/home/patient-profile/${patientData.id}`,
		},
	]

	const handleGoToTeethForm = () => navigate('/appointments/create/' + id)
	const handleGoToUpdatePatient = () => navigate('/home/update-patient/' + id)
	const handleGoToPhotos = () => navigate(`/photos/${id}/photos`)

	// eslint-disable-next-line
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
					setTitleName(
						` ${data.name.split(' ')[0]} ${
							data.name.split(' ')[2]
								? data.name.split(' ')[2]
								: data.name.split(' ')[1]
								? data.name.split(' ')[1]
								: ''
						}`,
					)
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
			navigate('/')
		}
	}, [id, setPatientData, setTeethList, setHandleState, navigate, setCompleteOdontogram])

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
		setAbutmentTooth('')
		setPitFissureSealant('')
	}, [setToothState, setPositionState, setAbutmentTooth, setPitFissureSealant])

	return {
		links,
		loading,
		tabValue,
		titleName,
		patientData,
		handleTabs,
		handleGoToPhotos,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	}
}

export default usePatientProfilePage
