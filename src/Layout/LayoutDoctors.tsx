import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import "@/styles/DoctorsLayout.css"

const LayoutDoctors = () => {
	return (
		<>
			<Navbar />
			<main className='doctosr_main'>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default LayoutDoctors
