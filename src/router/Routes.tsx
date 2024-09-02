import UpdateAppointmentPage from '@/page/UpdateAppointmentPage'
import PatientProfilePage from '@/page/PatientProfilePage'
import CreatePatientPage from '@/page/CreatePatientPage'
import UpdatePatientPage from '@/page/UpdatePatientPage'
import { createBrowserRouter } from 'react-router-dom'
import UpdatePhotosPage from '@/page/UpdatePhotosPage'
import AppointmentPage from '@/page/AppointmentPage'
import AddPhotosPage from '@/page/AddPhotosPage'
import TeethFormPage from '@/page/TeethFormPage'
import DoctorsPage from '@/page/DoctorsPage'
import PhotosPage from '@/page/PhotosPage'
import HomePage from '@/page/HomePage'
import Layout from '@/Layout/Layout'
import App from '@/App'

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />,
			children: [
				{
					path: '',
					element: <Layout />,
					children: [
						{
							path: '',
							element: <HomePage />,
						},
						{
							path: 'create-patient',
							element: <CreatePatientPage />,
						},
						{
							path: 'patient-profile/:id',
							element: <PatientProfilePage />,
						},
						{
							path: 'update-patient/:id',
							element: <UpdatePatientPage />,
						},
					],
				},
				{
					path: 'appointments',
					element: <Layout />,
					children: [
						{
							path: ':id_patient/appointment/:id_appointment/:last_appointment',
							element: <AppointmentPage />,
						},
						{
							path: 'create/:id_patient',
							element: <TeethFormPage />,
						},
						{
							path: ':id_patient/appointment/:id_appointment/update-appointment/:last_appointment',
							element: <UpdateAppointmentPage />,
						},
					],
				},
				{
					path: 'photos',
					element: <Layout />,
					children: [
						{
							path: ':id_patient/photos',
							element: <PhotosPage />,
						},
						{
							path: ':id_patient/photos/add-photos',
							element: <AddPhotosPage />,
						},
						{
							path: ':id_patient/photos/update-photos/:id_photo',
							element: <UpdatePhotosPage />,
						},
					],
				},
				{
					path: 'doctors',
					element: <Layout />,
					children: [
						{
							path: '',
							element: <DoctorsPage />,
						},
					],
				},
			],
		},
	],
	{
		basename: '/',
	},
)

export default router
