import Patient from '@/models/Patient'
import { useCallback, useEffect, useState } from 'react'
import { OrthoTerms, maxDate, minDate } from '@/utils/constants'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import { useNavigate, useParams } from 'react-router-dom'

function useUpdatePatientPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { patientData, setPatientData } = usePatientState()
	const { setHandleState } = useAlertState()
	const [progress, setUploadTask] = useState(0)
	const [avatarURL, setAvatarURL] = useState('')
	const [avatar, setAvatar] = useState<File | undefined>(undefined)
	const [loading, setLoading] = useState<boolean>(false)
	const [loadingPatient, setLoadingPatient] = useState<boolean>(false)

	const handleChangePhone = (
		e: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (typeof e === 'string') {
			setPatientData({
				...patientData,
				phone: e,
			})
		}
	}

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		if (e.target instanceof HTMLInputElement) {
			if (
				e.target.id === OrthoTerms.SNC ||
				e.target.id === OrthoTerms.SE ||
				e.target.id === OrthoTerms.SGI ||
				e.target.id === OrthoTerms.SGU ||
				e.target.id === OrthoTerms.SME ||
				e.target.id === OrthoTerms.SNC ||
				e.target.id === OrthoTerms.SR ||
				e.target.id === OrthoTerms.SU ||
				e.target.id === OrthoTerms.SVC
			)
				setPatientData({
					...patientData,
					[e.target.id]: e.target.checked,
				})
			else
				setPatientData({
					...patientData,
					[e.target.id]: e.target.value,
				})
		} else if (e.target instanceof HTMLTextAreaElement)
			setPatientData({
				...patientData,
				[e.target.id]: e.target.value,
			})
	}

	const handleChangeDate = (value: Date | null) => {
		try {
			if (value)
				setPatientData({
					...patientData,
					birthdate: value,
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSaveData = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (patientData.name === '') {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe agregar el nombre completo.',
				})
				throw 'Fiel name is empty.'
			}
			if (patientData.phone === '') {
				setHandleState({
					severity: 'warning',
					variant: 'filled',
					show: true,
					text: 'Debe agregar el número de teléfono.',
				})
				throw 'Fiel phone is empty.'
			}
			setLoadingPatient(true)

			const modelPatient = new Patient()
			let uploadURL: string = ''
			let avatarNewName: number

			if (!patientData.avatarName) {
				avatarNewName = new Date().getTime()
			} else {
				avatarNewName = patientData.avatarName
			}

			if (avatar) {
				setLoading(true)
				const uploadTask = await modelPatient.upLoadAvatar(
					avatar,
					avatarNewName,
					setUploadTask,
				)
				if (uploadTask.resolve) {
					uploadURL = uploadTask.downloadURL
					setPatientData({
						...patientData,
						avatarURL: uploadTask.downloadURL,
						avatarName: avatarNewName,
					})
				} else {
					setLoading(false)
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'Error al subir la imagen.',
					})
				}
			}

			if (id !== undefined) {
				const patient = await modelPatient.updatePatient(id, {
					...patientData,
					avatarURL: uploadURL,
					avatarName: avatarNewName,
				})
				
				if (patient) {
					setLoadingPatient(false)
					setPatientData({
						...patientData,
					})

					navigate(`/patient-profile/${id}`)

					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Datos modificados con éxito.',
					})
				} else {
					throw 'Error updating data.'
				}
			}
		} catch (error) {
			setLoadingPatient(false)
			console.log(error)
			setHandleState({
				severity: 'error',
				variant: 'filled',
				show: true,
				text: 'Error al modificar los datos.',
			})
		}
	}

	const handleCancelButton = () => {
		navigate(-1)
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Actualización del paciente cancelada.',
		})
	}

	const getPatient = useCallback(async () => {
		try {
			if (!patientData.id) {
				setLoadingPatient(true)
				const ModelPatient = new Patient()
				if (id) {
					setLoadingPatient(false)
					const getPatientData = await ModelPatient.getPatient(id)
					if (getPatientData) {
						if (getPatientData.avatarURL) setAvatarURL(getPatientData.avatarURL)
						setPatientData(getPatientData)
					}
				} else {
					setLoadingPatient(false)
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'Error al obtener los datos.',
					})
				}
			}
		} catch (error) {
			setLoadingPatient(false)
			console.log(error)
		}
	}, [id, setPatientData, setHandleState, patientData.id, setLoadingPatient])

	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (event.target.files !== null) {
				const file = event.target.files[0]
				if (file.type && file.type.startsWith('image/')) {
					const imgUrl = URL.createObjectURL(file)
					setAvatarURL(imgUrl)
					setAvatar(file)
				} else {
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'El archivo seleccionado no es una imagen.',
					})
				}
			}
		} catch (error) {
			console.log('Handle change file error: ' + error)
		}
	}

	const handleCancelFile = () => {
		setAvatar(undefined)
		setAvatarURL('')
	}

	useEffect(() => {
		if (id !== undefined) {
			if (patientData.avatarURL) setAvatarURL(patientData.avatarURL)
			getPatient()
		} else {
			if (patientData.avatarURL) setAvatarURL(patientData.avatarURL)
		}
	}, [id, getPatient, patientData.avatarURL])

	useEffect(() => {
		if (progress === 100) setLoading(false)
	}, [progress])

	return {
		minDate,
		maxDate,
		loading,
		avatarURL,
		patientData,
		loadingPatient,
		handleInput,
		handleSaveData,
		handleCancelFile,
		handleChangeDate,
		handleChangeFile,
		handleChangePhone,
		handleCancelButton,
	}
}

export default useUpdatePatientPage
