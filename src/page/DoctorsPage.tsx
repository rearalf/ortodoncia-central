import SkeletonComponent from '@/components/SkeletonComponent'
import TableDoctors from '@/components/Doctor/TableDoctors'
import ModalDoctor from '@/components/Doctor/ModalDoctor'
import HeadComponent from '@/components/HeadComponent'
import useDoctorsPage from '@/hooks/useDoctorsPage'
import BreadCrumbs from '@/components/BreadCrumbs'
import { FiUserPlus } from 'react-icons/fi'
import { Button } from '@mui/material'

const DoctorsPage = () => {
	const { links, loading, handleCreateDoctor, handleOpenCreateForm } = useDoctorsPage()
	return (
		<>
			<HeadComponent title="Doctores" />
			<BreadCrumbs links={links} />

			<div className="main_header">
				<h1>Doctores</h1>
				<Button
					variant="contained"
					startIcon={<FiUserPlus />}
					onClick={handleOpenCreateForm}
				>
					Nuevo doctor
				</Button>
			</div>

			{loading ? (
				<SkeletonComponent variant="rectangular" height={300} animation="wave" />
			) : (
				<TableDoctors />
			)}

			<ModalDoctor handleCreateDoctor={handleCreateDoctor} />
		</>
	)
}

export default DoctorsPage
