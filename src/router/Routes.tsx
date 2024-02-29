import App from '@/App'
import HomePage from '@/page/HomePage'
import TeethFormPage from '@/page/TeethFormPage'
import CreatePatientPage from '@/page/CreatePatientPage'
import PatientProfilePage from '@/page/PatientProfilePage'
import { createBrowserRouter } from 'react-router-dom'

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
			],
		},
	],
	{
		basename: '/',
	},
)

export default router
