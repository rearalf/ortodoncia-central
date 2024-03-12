import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AlertComponent from './components/AlertComponent'

function App() {
	return (
		<HelmetProvider>
			<AlertComponent />
			<Outlet />
		</HelmetProvider>
	)
}

export default App
