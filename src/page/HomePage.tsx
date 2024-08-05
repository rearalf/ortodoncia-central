import useHome from '@/hooks/useHome'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import BreadCrumbs from '@/components/BreadCrumbs'
import HeadComponent from '@/components/HeadComponent'
import { FiSearch, FiUserPlus, FiX } from 'react-icons/fi'
import TablePatient from '@/components/Patient/TablePatient'
import SkeletonComponent from '@/components/SkeletonComponent'
import { Button, InputAdornment, TextField, Tooltip } from '@mui/material'
import '@/styles/HomePage.css'
import Footer from '@/components/Footer'

const HomePage = () => {
	const { search, loading, handleChangeInput, handleSearchPatient, handleClearSearchPatient } =
		useHome()
	return (
		<>
			<HeadComponent title="Inicio" />
			<Navbar />
			<main className="home_main">
				<BreadCrumbs />
				<div className="main_header">
					<h1>Pacientes</h1>
					<Link to="/create-patient">
						<Button variant="contained" startIcon={<FiUserPlus />}>
							Paciente nuevo
						</Button>
					</Link>
				</div>
				<form onSubmit={handleSearchPatient} className="main_searchSection">
					<TextField
						label="Buscar"
						id="searchName"
						placeholder="Buscaro por nombre"
						className="searchSection_searchInput"
						value={search}
						onChange={handleChangeInput}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FiSearch />
								</InputAdornment>
							),
							endAdornment: search.length > 0 && (
								<InputAdornment position="end">
									<Tooltip title="">
										<Button onClick={handleClearSearchPatient}>
											<FiX />
										</Button>
									</Tooltip>
								</InputAdornment>
							),
						}}
					/>
					<Button variant="contained" type="submit">
						<FiSearch size={24} />
					</Button>
				</form>

				{loading ? (
					<SkeletonComponent variant="rectangular" height={300} animation="wave" />
				) : (
					<TablePatient />
				)}
			</main>
			<Footer />
		</>
	)
}

export default HomePage
