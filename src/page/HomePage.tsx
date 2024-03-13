import useHome from '@/hooks/useHome'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import HeadComponent from '@/components/HeadComponent'
import { FiSearch, FiUserPlus, FiX } from 'react-icons/fi'
import TablePatient from '@/components/Patient/TablePatient'
import { Button, InputAdornment, TextField, Tooltip } from '@mui/material'
import '@/styles/HomePage.css'

const HomePage = () => {
	const { search, handleChangeInput, handleSearchPatient, handleClearSearchPatient } = useHome()
	return (
		<>
			<HeadComponent title="Inicio" />
			<Navbar />
			<main className="home_main">
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
				<TablePatient />
			</main>
		</>
	)
}

export default HomePage
