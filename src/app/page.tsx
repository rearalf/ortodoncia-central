'use client'
import BreadCrumbs from '@/components/BreadCrumbs'
import styles from '@/styles/HomePage.module.css'
import { FiSearch, FiUserPlus, FiX } from 'react-icons/fi'
import Navbar from '@/components/Navbar'
import { Button, InputAdornment, TextField, Tooltip } from '@mui/material'
import Link from 'next/link'
import useHome from '@/hooks/useHome'
import SkeletonComponent from '@/components/SkeletonComponent'
import TablePatient from '@/components/Patient/TablePatient'

function Home() {
	const { search, loading, handleChangeInput, handleSearchPatient, handleClearSearchPatient } =
		useHome()
	return (
		<>
			<Navbar />
			<main className={styles['home-main']}>
				<BreadCrumbs />
				<div className={styles['main-header']}>
					<h1>Pacientes</h1>
					<Link href="/patient/create-patient">
						<Button variant="contained" startIcon={<FiUserPlus />}>
							Paciente nuevo
						</Button>
					</Link>
				</div>
				<form onSubmit={handleSearchPatient} className={styles['main-search_section']}>
					<TextField
						label="Buscar"
						id="searchName"
						placeholder="Buscaro por nombre"
						className={styles['search_section-search_input']}
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
		</>
	)
}

export default Home
