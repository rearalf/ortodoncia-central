import App from '@/App'
import HomePage from '@/page/HomePage'
import TeethFormPage from '@/page/TeethFormPage'
import CreatePatientPage from '@/page/CreatePatientPage'
import UpdatePatientPage from '@/page/UpdatePatientPage'
import PatientProfilePage from '@/page/PatientProfilePage'
import { createBrowserRouter } from 'react-router-dom'
import AppointmentPage from '@/page/AppointmentPage'
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
					path: '/teeth-form',
					element: <TeethFormPage />,
				},
				{
					path: '/update-patient/:id',
					element: <UpdatePatientPage />,
				},
				{
					path: '/patient-profile/:id_patient/appointment/:id_appointment',
					element: <AppointmentPage />,
				},
				{
					path: '/patient-profile/:id_patient/appointment/:id_appointment/update-appointment',
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
