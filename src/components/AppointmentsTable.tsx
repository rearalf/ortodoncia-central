import TablePaginationActions from './TablePaginationActions'
import useAppointmentState from '@/states/appointmentsState'
import { FiBookmark, FiCalendar } from 'react-icons/fi'
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
import Link from 'next/link'

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
					).map((data, i) => (
						<TableRow key={data.id}>
							<TableCell>{data.formatDate}</TableCell>
							<TableCell style={{ maxWidth: 250 }}>
								{data.treatment.split('\n').map((line, index) => (
									<p key={index}>{line}</p>
								))}
							</TableCell>
							<TableCell align="center">$ {data.cost}</TableCell>
							<TableCell align="center">{data.doctor}</TableCell>
							<TableCell align="center">
								{i === 0 && (
									<Tooltip title="Modificar cita">
										<Link
											href={`/patient-profile/${
												data.id_patient
											}/appointment/${data.id}/update-appointment/${true}`}
										>
											<IconButton>
												<FiCalendar size={20} />
											</IconButton>
										</Link>
									</Tooltip>
								)}
								<Tooltip title="Ver cita">
									<Link
										href={
											i === 0
												? `/patient-profile/${
														data.id_patient
												  }/appointment/${data.id}/${true}`
												: `/patient-profile/${
														data.id_patient
												  }/appointment/${data.id}/${false}`
										}
									>
										<IconButton>
											<FiBookmark size={20} />
										</IconButton>
									</Link>
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
				{appointments.length !== 0 && (
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
				)}
			</Table>
		</TableContainer>
	)
}

export default AppointmentsTable
