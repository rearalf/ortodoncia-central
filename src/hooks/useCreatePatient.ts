import React, { useEffect, useState } from 'react'
import useAlertState from '@/states/useAlertState'
import usePatientState from '@/states/patientState'
import useTeethState from '@/states/toothFormState'
import { useRouter } from 'next/navigation'
import Patient from '@/models/Patient'
import {
	maxDate,
	minDate,
	OrthoTerms,
	patientBasicData,
	constantTeethList,
} from '@/utils/constants'

function useCreatePatient() {
	const router = useRouter()
	const { patientData, setPatientData } = usePatientState()
	const { teethList, setTeethList } = useTeethState()
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
			) {
				setPatientData({
					...patientData,
					[e.target.id]: e.target.checked,
				})
			} else {
				if (e.target.id === 'completeOdontogram') {
					setPatientData({
						...patientData,
						completeOdontogram: e.target.checked,
					})
				} else {
					setPatientData({
						...patientData,
						[e.target.id]: e.target.value,
					})
				}
			}
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

			const newPatient = new Patient()
			let uploadURL: string = ''
			const avatarName: number = new Date().getTime()
			if (avatar) {
				setLoading(true)
				const uploadTask = await newPatient.upLoadAvatar(avatar, avatarName, setUploadTask)
				if (uploadTask.resolve) {
					uploadURL = uploadTask.downloadURL
					setPatientData({
						...patientData,
						avatarURL: uploadTask.downloadURL,
						avatarName: avatarName,
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

			const patient = await newPatient.save(
				{ ...patientData, avatarURL: uploadURL, avatarName: avatarName },
				teethList,
			)

			if (patient !== undefined) {
				setLoadingPatient(false)
				setPatientData({
					...patientData,
					id: patient,
				})
				router.push(`/patient/profile/${patient}`)

				setHandleState({
					severity: 'success',
					variant: 'filled',
					show: true,
					text: 'Datos guardados con éxito.',
				})
			} else {
				setLoadingPatient(false)
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al guardar los datos.',
				})
				throw 'Error creating patient.'
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleCancelButton = () => {
		router.push('/')
		setHandleState({
			severity: 'warning',
			variant: 'filled',
			show: true,
			text: 'Creación de paciente cancelada.',
		})
	}

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
		setPatientData(patientBasicData)
		setTeethList(constantTeethList)
	}, [setPatientData, setTeethList])

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
		handleChangeDate,
		handleChangeFile,
		handleCancelFile,
		handleChangePhone,
		handleCancelButton,
	}
}

export default useCreatePatient
