import App from '@/App'
import HomePage from '@/page/HomePage'
import AddXRaysPage from '../page/AddXRaysPage'
import TeethFormPage from '@/page/TeethFormPage'
import AppointmentPage from '@/page/AppointmentPage'
import { createBrowserRouter } from 'react-router-dom'
import CreatePatientPage from '@/page/CreatePatientPage'
import UpdatePatientPage from '@/page/UpdatePatientPage'
import PatientProfilePage from '@/page/PatientProfilePage'
import UpdateAppointmentPage from '@/page/UpdateAppointmentPage'

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
					path: '/patient-profile/:id/add-xrays',
					element: <AddXRaysPage />,
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
			],
		},
	],
	{
		basename: '/',
	},
)

export default router
