import App from '@/App'
import HomePage from '@/page/HomePage'
import PhotosPage from '@/page/PhotosPage'
import AddPhotosPage from '@/page/AddPhotosPage'
import TeethFormPage from '@/page/TeethFormPage'
import AppointmentPage from '@/page/AppointmentPage'
import { createBrowserRouter } from 'react-router-dom'
import CreatePatientPage from '@/page/CreatePatientPage'
import UpdatePatientPage from '@/page/UpdatePatientPage'
import PatientProfilePage from '@/page/PatientProfilePage'
import UpdateAppointmentPage from '@/page/UpdateAppointmentPage'
import UpdatePhotosPage from '@/page/UpdatePhotosPage'

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
			],
		},
	],
	{
		basename: '/',
	},
)

export default router
