import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import usePatientState from '@/states/patientState'
import useAlertState from '@/states/useAlertState'
import PatientPhotos from '@/models/PatientPhotos'
import formatDate from '@/utils/formatDate'
import Patient from '@/models/Patient'
import getAge from '@/utils/getAge'

function usePhotosPage() {
	const navigate = useNavigate()
	const { id_patient } = useParams()
	const { setHandleState } = useAlertState()
	const { setPatientData, patientData } = usePatientState()

	const [loading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<PhotosByPatientInterface[]>([])

	const [images, setImages] = useState<string[]>([])
	const [isViewerOpen, setIsViewerOpen] = useState(false)
	const [currentImage, setCurrentImage] = useState(0)

	const closeImageViewer = () => {
		setCurrentImage(0)
		setIsViewerOpen(false)
	}

	const openImageViewer = useCallback(
		(name: string) => {
			const index = images.indexOf(name)
			setCurrentImage(index)
			setIsViewerOpen(true)
		},
		[images],
	)

	const getPatientData = useCallback(async () => {
		try {
			if (id_patient) {
				setLoading(true)
				const patient = new Patient()
				const data = await patient.getPatient(id_patient)
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
	}, [id_patient, setPatientData, setHandleState, navigate])

	const getPhotos = useCallback(async () => {
		try {
			if (id_patient) {
				const patientPhotos = new PatientPhotos()
				const data = await patientPhotos.getPhotosByPatient(id_patient)

				const photoArray: PhotosByPatientInterface[] = []
				const imagesStrings: string[] = []

				if (data) {
					data.map((photo: getPhotosByPatientInterface) => {
						photoArray.push({
							...photo,
							formatDate: formatDate({
								date: photo.date,
							}),
							formatCreated_at: formatDate({
								date: photo.created_at,
							}),
							formatUpdated_at: formatDate({
								date: photo.updated_at,
							}),
							imagesLinks:
								typeof photo.imagesLinks !== 'string' ? photo.imagesLinks : [],
							imagesNames:
								typeof photo.imagesNames !== 'string' ? photo.imagesNames : [],
						})

						if (typeof photo.imagesLinks === 'object') {
							photo.imagesLinks.map(link => imagesStrings.push(link))
						}
					})
				}
				setImages(imagesStrings)
				setData(photoArray)
			}
		} catch (error) {
			console.log(error)
		}
	}, [id_patient])

	useEffect(() => {
		getPatientData()
	}, [id_patient, getPatientData])

	useEffect(() => {
		getPhotos()
	}, [id_patient, getPhotos])

	return {
		data,
		images,
		loading,
		patientData,
		currentImage,
		isViewerOpen,
		openImageViewer,
		closeImageViewer,
	}
}

export default usePhotosPage
