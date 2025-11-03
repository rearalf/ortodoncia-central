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
			link_to: `/home/patient-profile/${patientData.id}`,
		},
		{
			link_name: `Cita de ${patientData.name.split(' ')[0]} ${
				patientData.name.split(' ')[2]
					? patientData.name.split(' ')[2]
					: patientData.name.split(' ')[1]
			}`,
			link_to: `/appointments/${patientData.id}/appointment/${appointment.id}/${
				last_appointment === 'true' ? 'true' : 'false'
			}`,
		},
		{
			link_name: 'Modificar cita',
			link_to: `/appointments/${patientData.id}/appointment/${appointment.id}/update-appointment`,
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
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en la fecha.',
			})
		}
	}

	const handleChangeSelectInput = (e: SelectChangeEvent<string>) => {
		try {
			setAppointment({
				...appointment,
				doctor: e.target.value,
			})
		} catch (error) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en el doctor seleccionado.',
			})
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
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en el valor agregado.',
			})
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
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en la fecha.',
			})
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
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en la razón del cambio.',
			})
		}
	}

	const handleChangeCost = (e: { target: { name: string; value: string } }) => {
		try {
			setAppointment({
				...appointment,
				[e.target.name]: e.target.value,
			})
		} catch (error) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error en el costo agregado.',
			})
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
					} else if (updateAppoinment) {
						setHandleState({
							severity: 'info',
							variant: 'filled',
							show: true,
							text: 'El odontograma se actualizó, pero no la cita.',
						})
					} else if (updateTeeth) {
						setHandleState({
							severity: 'info',
							variant: 'filled',
							show: true,
							text: 'La actualización de la cita fue exitosa, no se actualizó el odontograma.',
						})
					} else {
						throw 'Error updating in update appointment.'
					}
					navigate(
						`/appointments/${patientData.id}/appointment/${appointment.id}/${true}`,
					)
				} else {
					const updateAppoinment = await appointmentClass.updateAppoinment(
						patientData.id,
						appointment.id,
						appointment,
					)

					if (updateAppoinment) {
						setHandleState({
							severity: 'success',
							variant: 'filled',
							show: true,
							text: 'La actualización de la cita fue exitosa.',
						})
						const address = `/appointments/${patientData.id}/appointment/${appointment.id}`
						last_appointment === 'true'
							? navigate(address + '/true')
							: navigate(address + '/false')
					} else {
						throw 'Error updating in update appointment.'
					}
				}
			}
		} catch (error) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: typeof error === 'string' ? error : 'Ocurrio un error al actualizar.',
			})
		} finally {
			setLoading(false)
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
			setHandleState({
				severity: 'warning',
				variant: 'filled',
				show: true,
				text: 'Actualización de la cita cancelada.',
			})
		} finally {
			setLoading(false)
		}
	}, [id_appointment, id_patient, setAppointment, setTeethList, setHandleState])

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
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al obtener los datos del paciente.',
			})
		} finally {
			setLoading(false)
		}
	}, [patientData.id, id_patient, setPatientData, setCompleteOdontogram, setHandleState])

	const getDoctors = useCallback(async () => {
		try {
			const doctorsModel = new Doctors()
			const doctorsData = await doctorsModel.getDoctors()
			if (Array.isArray(doctorsData)) setDoctors(doctorsData)
		} catch (error) {
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al obtener los datos del doctor.',
			})
		}
	}, [setDoctors, setHandleState])

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
