import React from 'react'
import {
	Button,
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
	Tooltip,
} from '@mui/material'
import { FiUser } from 'react-icons/fi'
import usePatientsState from '@/states/patientsState'
import TablePaginationActions from '../TablePaginationActions'
import { Link } from 'react-router-dom'

const TablePatient = () => {
	const { page, setPage, rowsPerPage, allPatients, setRowsPerPage } = usePatientsState()

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPatients.length) : 0

	const handleChangePage = (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label="Tabla de pacientes">
				<TableHead>
					<TableRow>
						<TableCell>Nombre</TableCell>
						<TableCell align="center">Fecha de nacimiento</TableCell>
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
					).map(patient => (
						<TableRow
							key={patient.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell scope="patient">
								<Tooltip title="Ir al perfil">
									<Link
										to={`/patient-profile/${patient.id}`}
										className="patient-name-link"
									>
										<Button variant="text">{patient.name}</Button>
									</Link>
								</Tooltip>
							</TableCell>
							<TableCell style={{ width: 250 }} align="center">
								<span>{patient.formatBirthdate?.toLocaleUpperCase()}</span>
							</TableCell>
							<TableCell style={{ width: 50 }} align="center">
								<span>{patient.age}</span>
							</TableCell>
							<TableCell style={{ width: 160 }} align="center">
								<Tooltip title="Llamar">
									<a href={`tel:+${patient.phone}`} className="info">
										{patient.phone}
									</a>
								</Tooltip>
							</TableCell>
							<TableCell style={{ width: 160 }} align="center">
								{patient.occupation}
							</TableCell>
							<TableCell style={{ width: 160 }} align="center">
								<Tooltip title="Ir al perfil">
									<Link to={`/patient-profile/${patient.id}`}>
										<IconButton>
											<FiUser size={20} />
										</IconButton>
									</Link>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					{allPatients.length === 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} align="center">
								<h3>No hay pacientes para mostrar</h3>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				{allPatients.length !== 0 && (
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
								colSpan={6}
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
				)}
			</Table>
		</TableContainer>
	)
}

export default TablePatient
