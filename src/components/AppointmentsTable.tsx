import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import useAppointmentState from '@/states/appointmentsState'

const AppointmentsTable = () => {
	const { appointments } = useAppointmentState()
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
					{appointments.map(data => (
						<TableRow key={data.id}>
							<TableCell>{data.formatDate}</TableCell>
							<TableCell>{data.treatment}</TableCell>
							<TableCell align="center">$ {data.cost}</TableCell>
							<TableCell align="center">{data.doctor}</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					))}
				</TableBody>
				{/* <TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											{ label: 'All', value: -1 },
										]}
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
							</TableFooter> */}
			</Table>
		</TableContainer>
	)
}

export default AppointmentsTable
