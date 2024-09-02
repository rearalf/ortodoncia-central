import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className="layout">
			<Navbar />
			<Container maxWidth="xl">
				<main>
					<Outlet />
				</main>
			</Container>
			<Footer />
		</div>
	)
}

export default Layout
