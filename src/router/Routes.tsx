import App from '@/App'
import Home from '@/page/Home'
import CreatePatient from '@/page/CreatePatient'
import { createBrowserRouter } from 'react-router-dom'
import PatientProfile from '@/page/PatientProfile'

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/create-patient',
					element: <CreatePatient />,
				},
				{
					path: '/patient-profile/:id',
					element: <PatientProfile />,
				},
			],
		},
	],
	{
		basename: '/',
	},
)

export default router
