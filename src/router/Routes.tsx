import App from '@/App'
import Home from '@/page/Home'
import CreatePatient from '@/page/CreatePatient'
import { createBrowserRouter } from 'react-router-dom'

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
			],
		},
	],
	{
		basename: '/',
	},
)

export default router
