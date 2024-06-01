import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useTeethState from '@/states/toothFormState'
import usePatientState from '@/states/patientState'
import useDoctorsState from '@/states/doctosState'
import useAlertState from '@/states/useAlertState'
import { SelectChangeEvent } from '@mui/material'
import Appointment from '@/models/Appointment'
import formatDate from '@/utils/formatDate'
import Doctors from '@/models/Doctors'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function useUpdateAppointmentPage() {
	const navigate = useNavigate()
	const { setHandleState } = useAlertState()
	const { id_patient, id_appointment, last_appointment } = useParams()
	const { patientData, setPatientData } = usePatientState()
	const { appointment, teethList, setAppointment, setTeethList, setCompleteOdontogram } =
		useTeethState()
	const [staticTeethList, setStaticTeethList] = useState<string>('')
	const [showOdontogram, setShowOdontogram] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const { doctors, setDoctors } = useDoctorsState()
	const [newChanges, setNewChange] = useState<{
		dateChange: Date
		formatdateChange: string
		reasonChange: string
	}>({
		dateChange: new Date(),
		formatdateChange: formatDate({ date: new Date() }),
		reasonChange: '',
	})

	const breadCrumbsLinks = [
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
		{
			link_name: `Cita de ${patientData.name.split(' ')[0]} ${
				patientData.name.split(' ')[2]
					? patientData.name.split(' ')[2]
					: patientData.name.split(' ')[1]
			}`,
			link_to: last_appointment
				? `/patient-profile/${patientData.id}/appointment/${appointment.id}/true`
				: `/patient-profile/${patientData.id}/appointment/${appointment.id}/false`,
		},
		{
			link_name: 'Modificar cita',
			link_to: `/patient-profile/${patientData.id}/appointment/${appointment.id}/update-appointment`,
		},
	]

	const handleChangeShowOdonto = () => setShowOdontogram(prev => !prev)

	const handleChangeInputDate = (value: Date | null) => {
		try {
			if (value)
				setAppointment({
					...appointment,
					date: value,
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeSelectInput = (e: SelectChangeEvent<string>) => {
		try {
			setAppointment({
				...appointment,
				doctor: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeInput = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		try {
			setAppointment({
				...appointment,
				[e.target.id]: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleReasonChangeInputDate = (value: Date | null) => {
		try {
			if (value) {
				setNewChange({
					...newChanges,
					dateChange: value,
					formatdateChange: formatDate({ date: new Date(value) }),
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleReasonChangeInput = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		try {
			setNewChange({
				...newChanges,
				reasonChange: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeCost = (e: { target: { name: string; value: string } }) => {
		try {
			setAppointment({
				...appointment,
				[e.target.name]: e.target.value,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSave = async () => {
		try {
			setLoading(true)
			if (patientData.id && appointment.id) {
				const appointmentClass = new Appointment()
				if (last_appointment === 'true' && staticTeethList !== JSON.stringify(teethList)) {
					if (!newChanges.reasonChange) {
						setHandleState({
							severity: 'error',
							variant: 'filled',
							show: true,
							text: 'Debe agregar una razón para hacer el cambio.',
						})
						throw 'Debe agregar una razón para hacer el cambio.'
					}

					const updateAppoinment = await appointmentClass.updateAppoinment(
						patientData.id,
						appointment.id,
						{
							...appointment,
							teeth: teethList,
							dateChange: newChanges.dateChange,
							reasonChange: newChanges.reasonChange,
						},
					)

					const ModelPatient = new Patient()
					const updateTeeth = await ModelPatient.updateOnlyTeeth(
						patientData.id,
						teethList,
					)

					if (updateAppoinment && updateTeeth) {
						setHandleState({
							severity: 'success',
							variant: 'filled',
							show: true,
							text: 'La actualización de la cita fue exitosa.',
						})
						setLoading(false)
					} else if (updateAppoinment) {
						setLoading(false)
						setHandleState({
							severity: 'info',
							variant: 'filled',
							show: true,
							text: 'El odontograma se actualizó, pero no la cita.',
						})
					} else if (updateTeeth) {
						setLoading(false)
						setHandleState({
							severity: 'info',
							variant: 'filled',
							show: true,
							text: 'La actualización de la cita fue exitosa, no se actualizó el odontograma.',
						})
					} else {
						setLoading(false)
						throw 'Error updating in update appointment.'
					}
					navigate(
						`/patient-profile/${patientData.id}/appointment/${appointment.id}/${true}`,
					)
				} else {
					const updateAppoinment = await appointmentClass.updateAppoinment(
						patientData.id,
						appointment.id,
						appointment,
					)

					if (updateAppoinment) {
						setLoading(false)
						setHandleState({
							severity: 'success',
							variant: 'filled',
							show: true,
							text: 'La actualización de la cita fue exitosa.',
						})
						const address = `/patient-profile/${patientData.id}/appointment/${appointment.id}`
						last_appointment === 'true'
							? navigate(address + '/true')
							: navigate(address + '/false')
					} else {
						setLoading(false)
						throw 'Error updating in update appointment.'
					}
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: typeof error === 'string' ? error : 'Ocurrio un error al actualizar.',
			})
		}
	}

	const handleCancel = () => {
		navigate(-1)
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Actualización de la cita cancelada.',
		})
	}

	const getAppointmentData = useCallback(async () => {
		try {
			setLoading(true)
			if (id_appointment && id_patient) {
				const appointmentClass = new Appointment()
				const appointmentById = await appointmentClass.getAppointment(
					id_patient,
					id_appointment,
				)
				if (appointmentById) {
					setLoading(false)
					setAppointment({
						...appointmentById,
						date: new Date(
							appointmentById.date.seconds * 1000 +
								appointmentById.date.nanoseconds / 1000000,
						),
						formatDate: formatDate({
							date: new Date(
								appointmentById.date.seconds * 1000 +
									appointmentById.date.nanoseconds / 1000000,
							),
						}),
						id: id_appointment,
					})
					if (appointmentById.reasonChange) {
						setNewChange({
							dateChange: new Date(
								appointmentById.dateChange.seconds * 1000 +
									appointmentById.dateChange.nanoseconds / 1000000,
							),
							formatdateChange: formatDate({
								date: new Date(
									appointmentById.dateChange.seconds * 1000 +
										appointmentById.dateChange.nanoseconds / 1000000,
								),
							}),
							reasonChange: appointmentById.reasonChange,
						})
					}
					const teeth = JSON.parse(appointmentById.teeth)
					if (typeof teeth !== 'string') {
						setTeethList(teeth)
					} else {
						const teeth1 = JSON.parse(teeth)
						setTeethList(teeth1)
					}
					setStaticTeethList(appointmentById.teeth)
				}
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}, [id_appointment, setAppointment, setTeethList, id_patient])

	const getPatientData = useCallback(async () => {
		try {
			setLoading(true)
			const patientClass = new Patient()
			if (!patientData.id && id_patient) {
				const data = await patientClass.getPatient(id_patient)
				if (data !== undefined) {
					setLoading(false)
					setPatientData({
						...data,
						age: getAge(data.birthdate.toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
					setCompleteOdontogram(data.completeOdontogram)
				}
				setLoading(false)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}, [id_patient, setPatientData, patientData.id, setCompleteOdontogram])

	const getDoctors = useCallback(async () => {
		try {
			const doctorsModel = new Doctors()
			const doctorsData = await doctorsModel.getDoctors()
			if (Array.isArray(doctorsData)) setDoctors(doctorsData)
		} catch (error) {
			console.log(error)
		}
	}, [setDoctors])

	useEffect(() => {
		getAppointmentData()
		getPatientData()
	}, [id_patient, id_appointment, getPatientData, getAppointmentData])

	useEffect(() => {
		getDoctors()
	}, [getDoctors])

	return {
		doctors,
		loading,
		newChanges,
		appointment,
		patientData,
		showOdontogram,
		last_appointment,
		breadCrumbsLinks,
		handleSave,
		handleCancel,
		handleChangeCost,
		handleChangeInput,
		handleChangeInputDate,
		handleChangeShowOdonto,
		handleChangeSelectInput,
		handleReasonChangeInput,
		handleReasonChangeInputDate,
	}
}

export default useUpdateAppointmentPage
