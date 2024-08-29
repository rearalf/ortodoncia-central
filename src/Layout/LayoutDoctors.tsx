import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/DoctorsLayout.css'
import { Container } from '@mui/material'

const LayoutDoctors = () => {
	return (
		<div className="layoutDoctors">
			<Navbar />
			<Container maxWidth="lg">
				<main>
					<Outlet />
				</main>
			</Container>
			<Footer />
		</div>
	)
}

export default LayoutDoctors
