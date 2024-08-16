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
import App from '@/App'
import LayoutDoctors from '@/Layout/LayoutDoctors'

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />,
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '/create-patient',
					element: <CreatePatientPage />,
				},
				{
					path: '/patient-profile/:id',
					element: <PatientProfilePage />,
				},

				{
					path: '/teeth-form/:id_patient',
					element: <TeethFormPage />,
				},
				{
					path: '/update-patient/:id',
					element: <UpdatePatientPage />,
				},
				{
					path: '/patient-profile/:id_patient/appointment/:id_appointment/:last_appointment',
					element: <AppointmentPage />,
				},
				{
					path: '/patient-profile/:id_patient/appointment/:id_appointment/update-appointment/:last_appointment',
					element: <UpdateAppointmentPage />,
				},
				{
					path: '/patient-profile/:id_patient/photos',
					element: <PhotosPage />,
				},
				{
					path: '/patient-profile/:id_patient/photos/add-photos',
					element: <AddPhotosPage />,
				},
				{
					path: '/patient-profile/:id_patient/photos/update-photos/:id_photo',
					element: <UpdatePhotosPage />,
				},
				{
					path: '/doctors',
					element: <LayoutDoctors />,
					children: [
						{
							path: '/doctors',
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
