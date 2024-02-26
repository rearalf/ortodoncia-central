import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '@/page/Home'
import CreatePatient from '@/page/CreatePatient'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/create-patient',
		element: <CreatePatient />,
	},
])

const Routes = () => {
	return <RouterProvider router={router} />
}

export default Routes
