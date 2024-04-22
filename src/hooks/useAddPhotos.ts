'use client'
import { useCallback, useEffect, useState } from 'react'
import usePatientState from '@/states/patientState'
import PatientPhotos from '@/models/PatientPhotos'
import useAlertState from '@/states/useAlertState'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'next/navigation'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/database/firebase'

function useAddPhotos(id_patient: string) {
	const router = useRouter()
	const { patientData, setPatientData } = usePatientState()
	const { setHandleState } = useAlertState()

	const [loading, setLoading] = useState<boolean>(false)

	const [files, setFiles] = useState<FileList | null>(null)
	const [images, setImages] = useState<string[]>([])
	const [imagesNames, setImagesNames] = useState<string[]>([])
	const [isDragging, setIsDragging] = useState(false)

	const [description, setDescription] = useState<string>('')

	const [currentImage, setCurrentImage] = useState(0)
	const [isViewerOpen, setIsViewerOpen] = useState(false)
	const [progress, setProgress] = useState(0)
	const [numberImages, setNumberImages] = useState(0)

	const links = [
		{
			link_name: 'Inicio',
			link_to: '/',
		},
		{
			link_name: `Paciente ${patientData.name ? patientData.name.split(' ')[0] : ''} ${
				patientData.name
					? patientData.name.split(' ')[2]
						? patientData.name.split(' ')[2]
						: patientData.name.split(' ')[1]
					: ''
			}`,
			link_to: `/patient/profile/${patientData.id}`,
		},
		{
			link_name: 'Fotos e imagenes',
			link_to: `/photos/${patientData.id}/`,
		},
		{
			link_name: 'Agregar fotos e imagenes',
			link_to: `/photos/${patientData.id}/add-photos`,
		},
	]

	const openImageViewer = useCallback((index: number) => {
		setCurrentImage(index)
		setIsViewerOpen(true)
	}, [])

	const closeImageViewer = () => {
		setCurrentImage(0)
		setIsViewerOpen(false)
	}

	const getPatientData = useCallback(async () => {
		try {
			if (id_patient) {
				setLoading(true)
				const modelPatient = new Patient()
				const data = await modelPatient.getPatient(id_patient)
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
			router.replace('/', { scroll: false })
		}
	}, [id_patient, setPatientData, setHandleState])

	const handleOnChangeInput = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setDescription(e.target.value)
	}

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (e.target.files !== null) {
				const addFiles = e.target.files
				validateAndAddFiles(addFiles)
			}
		} catch (error) {
			console.log('Handle change file error: ' + error)
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

	const handleSavePhotos = async (e: React.FormEvent<HTMLFormElement>) => {
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

			setNumberImages(files.length)
			setLoading(true)

			if (patientData.id) {
				const imagesLinks: string[] = []
				const imagesNames: string[] = []
				let lengthFiles = files.length
				for (let i = 0; i < files.length; i++) {
					const photoName = `${new Date().getTime()}_${patientData.id}_${i + 1}`
					const photosRef = ref(storage, `${patientData.id}/` + photoName)

					const file = files.item(i)
					if (file) {
						const uploadTask = uploadBytesResumable(photosRef, file)

						uploadTask.on(
							'state_changed',
							snapshot => {
								const progress =
									(snapshot.bytesTransferred / snapshot.totalBytes) * 100
								setProgress(progress)
								if (progress === 100) {
									setNumberImages(preventValue => preventValue - 1)
								}
							},
							error => {
								setLoading(false)
								setHandleState({
									severity: 'error',
									variant: 'filled',
									show: true,
									text: 'Error al subir la imagen.',
								})
								throw error
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref).then(
									(downloadURL: string) => {
										imagesLinks.push(downloadURL)
										imagesNames.push(photoName)
										lengthFiles--
										if (lengthFiles === 0) {
											saveData(imagesLinks, imagesNames)
										}
									},
								)
							},
						)
					}
				}
			} else {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Ocurrio un error al guardar.',
				})
				throw 'Debe de agregar una descripción a la imagen.'
			}
		} catch (error) {
			console.log('Error saving expedient photos: ' + error)
		}
	}

	const saveData = async (imagesLinks: string[], imagesNames: string[]) => {
		try {
			if (patientData.id) {
				const patientPhotos = new PatientPhotos()
				const saveDate = await patientPhotos.savePatientPhotos(patientData.id, {
					date: new Date(),
					description,
					imagesLinks,
					imagesNames,
				})

				if (saveDate?.id) {
					setLoading(false)
					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Datos e imagenes guardados exitosamente.',
					})
					router.push('/photos/' + patientData.id, { scroll: false })
				} else {
					setLoading(false)
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'Error al guardar los datos.',
					})
					throw saveDate
				}
			} else {
				setLoading(false)
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al guardar los datos.',
				})
				throw patientData
			}
		} catch (error) {
			console.log('Saving data error: ' + error)
		}
	}

	const handleCancelButton = () => {
		router.push(`/photos/${patientData.id}/`, { scroll: false })
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

	const onDragLeave = () => setIsDragging(false)

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		if (e.dataTransfer.files !== null) {
			const addFiles = e.dataTransfer.files
			validateAndAddFiles(addFiles)
		}
	}

	const validateAndAddFiles = (fileList: FileList) => {
		const newImages: string[] = []
		const newFiles: File[] = []
		const newImagesNames: string[] = []

		for (let i = 0; i < fileList.length; i++) {
			const newFile = fileList[i]

			if (!newFile.type.startsWith('image/')) {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Por favor, selecciona solo archivos de imagen.',
				})
				continue
			}

			if (imagesNames.includes(newFile.name)) {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: `El archivo ${newFile.name} ya ha sido agregado.`,
				})
				continue
			}

			newImages.push(URL.createObjectURL(newFile))
			newFiles.push(newFile)
			newImagesNames.push(newFile.name)
		}

		setImagesNames(prevImagesNames => prevImagesNames.concat(newImagesNames))
		setImages(prevImages => prevImages.concat(newImages))
		setFiles(prevFiles => {
			if (!prevFiles) return fileList
			const mergedFiles = new DataTransfer()
			for (let i = 0; i < prevFiles.length; i++) {
				mergedFiles.items.add(prevFiles[i])
			}
			for (let i = 0; i < newFiles.length; i++) {
				mergedFiles.items.add(newFiles[i])
			}
			return mergedFiles.files
		})
	}

	useEffect(() => {
		getPatientData()
	}, [id_patient, getPatientData])

	return {
		links,
		images,
		loading,
		progress,
		isDragging,
		description,
		patientData,
		numberImages,
		currentImage,
		isViewerOpen,
		onDrop,
		onDragOver,
		onDragLeave,
		openImageViewer,
		closeImageViewer,
		handleChangeFile,
		handleSavePhotos,
		handleDeleteImage,
		handleCancelButton,
		handleOnChangeInput,
	}
}

export default useAddPhotos
