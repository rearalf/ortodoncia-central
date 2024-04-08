import AlertComponent from './components/AlertComponent'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import useTheme from '@/hooks/useTheme'

function App() {
	const { theme } = useTheme()
	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<AlertComponent />
				<Outlet />
			</ThemeProvider>
		</HelmetProvider>
	)
}

export default App
