import { Outlet, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useEffect } from 'react'

const Layout = () => {
	const navigate = useNavigate()
	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) navigate("/")
	}, [])

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
