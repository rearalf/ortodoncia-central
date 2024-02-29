import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

function App() {
	return (
		<HelmetProvider>
			<Outlet />
		</HelmetProvider>
	)
}

export default App
