import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import usePatientState from '@/states/patientState'
import useAlertState from '@/states/useAlertState'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'
import PatientPhotos from '@/models/PatientPhotos'

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/database/firebase'

function useUpdatePhotosPage() {
	const navigate = useNavigate()
	const { id_patient, id_photo } = useParams()
	const { patientData, setPatientData } = usePatientState()
	const { setHandleState } = useAlertState()

	const [loading, setLoading] = useState<boolean>(false)

	const [files, setFiles] = useState<FileList | null>(null)
	const [images, setImages] = useState<string[]>([])
	const [imagesNames, setImagesNames] = useState<string[]>([])
	const [isDragging, setIsDragging] = useState(false)
	const [titleName, setTitleName] = useState('')

	const [description, setDescription] = useState<string>('')

	const [currentImage, setCurrentImage] = useState(0)
	const [isViewerOpen, setIsViewerOpen] = useState(false)
	const [progress, setProgress] = useState(0)
	const [numberImages, setNumberImages] = useState(0)

	const [staticData, setStaticData] = useState<{
		id: string
		date: Date
		description: string
		imagesNames: string[]
		imagesLinks: string[]
		created_at: Date
		updated_at: Date
	}>({
		id: '',
		date: new Date(),
		description: '',
		imagesNames: [],
		imagesLinks: [],
		created_at: new Date(),
		updated_at: new Date(),
	})
	const [deleteImage, setDeleteImage] = useState<string[]>([])
	const [imagesNamesStay, setImagesNamesStay] = useState<string[]>([])
	const [imagesLinksStay, setImagesLinksStay] = useState<string[]>([])

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
					setTitleName(
						` ${data.name.split(' ')[0]} ${
							data.name.split(' ')[2]
								? data.name.split(' ')[2]
								: data.name.split(' ')[1]
								? data.name.split(' ')[1]
								: ''
						}`,
					)
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
	}, [id_patient, setPatientData, setHandleState, navigate])

	const getPhotos = useCallback(async () => {
		try {
			if (id_photo && id_patient) {
				setLoading(true)
				const patientPhoto = new PatientPhotos()
				const photo = await patientPhoto.getOnePhotosByPatient(id_patient, id_photo)

				if (photo) {
					setStaticData(photo)
					setDescription(photo.description)
					setImages(photo.imagesLinks)
					setImagesNames(photo.imagesNames)

					setImagesNamesStay(photo.imagesNames)
					setImagesLinksStay(photo.imagesLinks)
				}
			} else {
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al obtener los datos de este expediente.',
				})
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log('Error getting patient data usePatient: ' + error)
			navigate('/')
		}
	}, [id_photo, id_patient, navigate, setHandleState])

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

	const handleDeleteImage = (index: number, img: string) => {
		const existImage = images.includes(img)

		if (existImage) {
			const valueIndex = staticData.imagesLinks.findIndex(value => value === img)
			const valueName = staticData.imagesNames[valueIndex]

			setDeleteImage(prevImages => {
				const newArray = [...prevImages]
				newArray.push(valueName)
				return newArray
			})
			setImages(prevImages => {
				const newImages = [...prevImages]
				newImages.splice(index, 1)
				return newImages
			})
			setImagesNames(prevImages => {
				const newImages = [...prevImages]
				newImages.splice(index, 1)
				return newImages
			})

			setImagesNamesStay(prevImages => {
				const newImages = [...prevImages]
				newImages.splice(index, 1)
				return newImages
			})
			setImagesLinksStay(prevImages => {
				const newImages = [...prevImages]
				newImages.splice(index, 1)
				return newImages
			})
		} else {
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
	}

	const handleSavePhotos = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setLoading(true)
			if (id_patient && id_photo) {
				if (description.trim() === '') {
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'Debe de agregar una descripción a la imagen.',
					})
					throw 'Debe de agregar una descripción a la imagen.'
				}

				const patientPhoto = new PatientPhotos()
				if (!files || files.length === 0) {
					if (deleteImage.length === 0) {
						if (staticData?.description.trim() !== description.trim()) {
							const update = await patientPhoto.updatePhotosByPhoto(
								id_patient,
								id_photo,
								{
									description,
									imagesLinks: staticData.imagesLinks,
									imagesNames: staticData.imagesNames,
								},
							)
							if (update) {
								setHandleState({
									severity: 'success',
									variant: 'filled',
									show: true,
									text: 'Actualización exitosa.',
								})
								navigate('/patient-profile/' + patientData.id + '/photos')
								setLoading(false)
							} else {
								setHandleState({
									severity: 'error',
									variant: 'filled',
									show: true,
									text: 'Error al actualizar los datos.',
								})
								setLoading(false)
							}
						} else {
							setHandleState({
								severity: 'success',
								variant: 'filled',
								show: true,
								text: 'Actualización exitosa.',
							})
							navigate('/patient-profile/' + patientData.id + '/photos')
							setLoading(false)
						}
					} else {
						setNumberImages(deleteImage.length)
						deleteImage.map(async name => {
							const photoRef = ref(storage, `/${id_patient}/${name}`)
							const deletePhoto = await deleteObject(photoRef)
								.then(() => {
									return true
								})
								.catch(() => false)
							if (deletePhoto) {
								setNumberImages(prevNumber => prevNumber - 1)
							}
						})

						const update = await patientPhoto.updatePhotosByPhoto(
							id_patient,
							id_photo,
							{
								description,
								imagesLinks: images,
								imagesNames: imagesNames,
							},
						)
						if (update) {
							setHandleState({
								severity: 'success',
								variant: 'filled',
								show: true,
								text: 'Actualización exitosa.',
							})
							navigate('/patient-profile/' + patientData.id + '/photos')
							setLoading(false)
						} else {
							setHandleState({
								severity: 'error',
								variant: 'filled',
								show: true,
								text: 'Error al actualizar los datos.',
							})
							setLoading(false)
						}
					}
				} else {
					setNumberImages(files.length)
					setLoading(true)

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
												updateData(imagesLinks, imagesNames)
											}
										},
									)
								},
							)
						}
					}
				}
			} else {
				setLoading(false)
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Ocurrio un error al actualizar los datos.',
				})
				throw 'Error al actualizar los datos.'
			}
		} catch (error) {
			console.log('Error saving expedient photos: ' + error)
		}
	}

	const updateData = async (newImagesLinks: string[], newImagesNames: string[]) => {
		try {
			if (id_patient && id_photo) {
				setNumberImages(deleteImage.length)
				deleteImage.map(async name => {
					const photoRef = ref(storage, `/${id_patient}/${name}`)
					const deletePhoto = await deleteObject(photoRef)
						.then(() => {
							return true
						})
						.catch(() => false)
					if (deletePhoto) {
						setNumberImages(prevNumber => prevNumber - 1)
					}
				})
				const patientPhoto = new PatientPhotos()
				const update = await patientPhoto.updatePhotosByPhoto(id_patient, id_photo, {
					description,
					imagesLinks: [...imagesLinksStay, ...newImagesLinks],
					imagesNames: [...imagesNamesStay, ...newImagesNames],
				})
				if (update) {
					setHandleState({
						severity: 'success',
						variant: 'filled',
						show: true,
						text: 'Actualización exitosa.',
					})
					navigate('/patient-profile/' + patientData.id + '/photos')
					setLoading(false)
				} else {
					setHandleState({
						severity: 'error',
						variant: 'filled',
						show: true,
						text: 'Error al actualizar los datos.',
					})
					setLoading(false)
				}
			} else {
				setLoading(false)
				setHandleState({
					severity: 'error',
					variant: 'filled',
					show: true,
					text: 'Error al actualizar los datos.',
				})
				throw patientData
			}
		} catch (error) {
			console.log('Updating data error: ' + error)
		}
	}

	const handleCancelButton = () => {
		navigate(`/patient-profile/${patientData.id}/photos`)
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

	useEffect(() => {
		getPhotos()
	}, [id_photo, getPhotos])

	return {
		images,
		loading,
		progress,
		titleName,
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

export default useUpdatePhotosPage
