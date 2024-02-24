'use client'
import React, { useCallback, useEffect } from 'react'
import Patient from '@/models/Patient'
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import usePatientsState from '@/states/patientsState'

interface TablePaginationActionsProps {
	count: number
	page: number
	rowsPerPage: number
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const { count, page, rowsPerPage, onPageChange } = props

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, 0)
	}

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1)
	}

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1)
	}

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="Primera página"
			>
				<FiChevronsLeft />
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="Pagina anterior"
			>
				<FiChevronLeft />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Siguiente página"
			>
				<FiChevronRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Última página"
			>
				<FiChevronsRight />
			</IconButton>
		</Box>
	)
}

const TablePatient = () => {
	const { page, setPage, rowsPerPage, allPatients, setAllPatients, setRowsPerPage } =
		usePatientsState()

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPatients.length) : 0

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const getAllPatient = useCallback(async () => {
		try {
			const patientInstance = new Patient()
			const patientsData = await patientInstance.getAllPatients('name', 'asc')

			setAllPatients(patientsData)
		} catch (error) {
			console.log(error)
		}
	}, [setAllPatients])

	useEffect(() => {
		getAllPatient()
	}, [getAllPatient, rowsPerPage])

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
				<TableHead>
					<TableRow>
						<TableCell>Nombre</TableCell>
						<TableCell align="center">Edad</TableCell>
						<TableCell align="center">Teléfono</TableCell>
						<TableCell align="center">Ocupación</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? allPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: allPatients
					).map(patient => {
						// console.log(patient)
						return (
							<TableRow key={patient.id_patient}>
								<TableCell scope="patient">{patient.name}</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{new Date(patient.birthdate).toString()}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{patient.phone}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{patient.occupation}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center"></TableCell>
							</TableRow>
						)
					})}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							colSpan={5}
							count={allPatients.length}
							rowsPerPage={rowsPerPage}
							page={page}
							labelRowsPerPage="Filas pro página"
							slotProps={{
								select: {
									inputProps: {
										'aria-label': 'Filas por página',
									},
									native: false,
								},
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)
}

export default TablePatient
