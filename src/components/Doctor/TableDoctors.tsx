import useDoctorsState from '@/states/doctosState'
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
import { FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import TablePaginationActions from '../TablePaginationActions'

const TableDoctors = () => {
	const {
		page,
		allDoctors,
		rowsPerPage,
		setPage,
		setAction,
		setShowModal,
		setInputValue,
		setRowsPerPage,
		setDoctorSelect,
	} = useDoctorsState()

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allDoctors.length) : 0

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
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? allDoctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: allDoctors
					).map(doctor => (
						<TableRow
							key={doctor.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell scope="patient">
								<Tooltip title="Ir al perfil">
									<Link
										to={`/patient-profile/${doctor.id}`}
										className="patient-name-link"
									>
										<Button variant="text">{doctor.fullName}</Button>
									</Link>
								</Tooltip>
							</TableCell>

							<TableCell style={{ width: 160 }} align="center">
								<Tooltip title="Modificar nombre">
									<IconButton
										onClick={() => {
											setShowModal(true)
											setAction('edit')
											setDoctorSelect({
												id: doctor.id || '',
												fullName: doctor.fullName,
											})
											setInputValue(doctor.fullName)
										}}
									>
										<FiEdit size={20} />
									</IconButton>
								</Tooltip>
								<Tooltip title="Modificar nombre">
									<IconButton
										onClick={() => {
											setShowModal(true)
											setAction('delete')
											setDoctorSelect({
												id: doctor.id || '',
												fullName: doctor.fullName,
											})
											setInputValue(doctor.fullName)
										}}
									>
										<FiTrash size={20} />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					{allDoctors.length === 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} align="center">
								<h3>No hay pacientes para mostrar</h3>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				{allDoctors.length !== 0 && (
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
								colSpan={6}
								count={allDoctors.length}
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

export default TableDoctors
