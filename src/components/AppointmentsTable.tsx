import {
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
import useAppointmentState from '@/states/appointmentsState'
import TablePaginationActions from './TablePaginationActions'
import { FiCalendar } from 'react-icons/fi'

const AppointmentsTable = () => {
	const { appointments, setPage, setRowsPerPage, page, rowsPerPage } = useAppointmentState()

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - appointments.length) : 0

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
			<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
				<TableHead>
					<TableRow>
						<TableCell>Fecha</TableCell>
						<TableCell>Tratamiento</TableCell>
						<TableCell align="center">Costo</TableCell>
						<TableCell align="center">Doctor</TableCell>
						<TableCell align="center">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: appointments
					).map(data => (
						<TableRow key={data.id}>
							<TableCell>{data.formatDate}</TableCell>
							<TableCell>{data.treatment}</TableCell>
							<TableCell align="center">$ {data.cost}</TableCell>
							<TableCell align="center">{data.doctor}</TableCell>
							<TableCell align="center">
								<Tooltip title="Ver cita">
									<IconButton>
										<FiCalendar />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					{appointments.length === 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} align="center">
								<h3>No hay citas para mostrar</h3>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							colSpan={5}
							count={appointments.length}
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

export default AppointmentsTable
