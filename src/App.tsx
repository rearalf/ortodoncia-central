import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import '@/styles/App.css'

function App() {
	return (
		<HelmetProvider>
			<Outlet />
		</HelmetProvider>
	)
}

export default App
