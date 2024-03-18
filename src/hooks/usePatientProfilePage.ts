import getAge from '@/utils/getAge'
import Patient from '@/models/Patient'
import { useCallback, useEffect } from 'react'
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

	const handleGoToTeethForm = () => navigate('/teeth-form/' + id)
	const handleGoToUpdatePatient = () => navigate('/update-patient/' + id)

	const getPatientData = useCallback(async () => {
		try {
			if (id) {
				const patient = new Patient()
				const data = await patient.getPatient(id)
				if (data !== undefined) {
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
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
				allAppointment.map(data =>
					appointmentsList.push({
						...data,
						id_patient: id,
						formatDate: formatDate({ date: data.date }),
					}),
				)
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
		patientData,
		handleGoToTeethForm,
		handleGoToUpdatePatient,
	}
}

export default usePatientProfilePage
