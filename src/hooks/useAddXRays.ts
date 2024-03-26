import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import usePatientState from '@/states/patientState'
import useAlertState from '@/states/useAlertState'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function useAddXRays() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { patientData, setPatientData } = usePatientState()
	const { setHandleState } = useAlertState()

	const [loading, setLoading] = useState<boolean>(false)
	const [files, setFiles] = useState<FileList | undefined>(undefined)
	const [images, setImages] = useState<string[]>([])
	const [description, setDescription] = useState<string>('')
	const [isDragging, setIsDragging] = useState(false)

	const getPatientData = useCallback(async () => {
		try {
			if (id) {
				setLoading(true)
				const modelPatient = new Patient()
				const data = await modelPatient.getPatient(id)
				if (data !== undefined) {
					setLoading(false)
					setPatientData({
						...data,
						age: getAge(new Date(data.birthdate).toISOString()),
						formatBirthdate: formatDate({ date: data.birthdate }),
					})
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
	}, [id, setPatientData, setHandleState, navigate])

	const handleOnChangeInput = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setDescription(e.target.value)
	}

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (e.target.files !== null) {
				const addFiles = e.target.files
				setFiles(addFiles)
				getUrlFileList(addFiles)
			}
		} catch (error) {
			console.log('Handle change file error: ' + error)
		}
	}

	const getUrlFileList = (fileList: FileList) => {
		try {
			const newImages: string[] = []
			for (let i = 0; i < fileList.length; i++) {
				const imgUrl = URL.createObjectURL(fileList[i])
				newImages.push(imgUrl)
			}
			setImages(prevImages => prevImages.concat(newImages))
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteImage = (index: number) => {
		setImages(prevImages => {
			const newImages = [...prevImages]
			newImages.splice(index, 1)
			return newImages
		})
		setFiles(prevFiles => {
			if (!prevFiles) return prevFiles

			const newFiles = new DataTransfer()
			for (let i = 0; i < prevFiles.length; i++) {
				if (i !== index) {
					newFiles.items.add(prevFiles.item(i)!)
				}
			}
			return newFiles.files
		})
	}

	const handleSavePhotos = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			if (!files || files.length === 0) {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Debe agregar imagenes para guardar.',
				})
				throw 'Error'
			}

			if (description.trim() === '') {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Debe de agregar una descripción a la imagen.',
				})
				throw 'Debe de agregar una descripción a la imagen.'
			}
		} catch (error) {
			console.log('Error saving expedient photos: ' + error)
		}
	}

	const handleCancelButton = () => {
		navigate(`/patient-profile/${patientData.id}`)
		setHandleState({
			severity: 'info',
			variant: 'filled',
			show: true,
			text: 'Se cancelo agregar imagenes al expediente.',
		})
	}

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const onDragLeave = () => {
		setIsDragging(false)
	}

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		if (e.dataTransfer.files !== null) {
			const addFiles = e.dataTransfer.files
			setFiles(addFiles)
			getUrlFileList(addFiles)
		}
	}

	useEffect(() => {
		getPatientData()
	}, [id, getPatientData])

	return {
		images,
		loading,
		isDragging,
		description,
		patientData,
		onDrop,
		onDragOver,
		onDragLeave,
		handleChangeFile,
		handleSavePhotos,
		handleDeleteImage,
		handleCancelButton,
		handleOnChangeInput,
	}
}

export default useAddXRays
