import Navbar from '@/components/Navbar'
import HeadComponent from '@/components/HeadComponent'
import useUpdateAppointmentPage from '@/hooks/useUpdateAppointmentPage'
import '@/styles/UpdateAppointmentPage.css'
import InputDate from '@/components/InputDate'
import InputNumericFormat from '@/components/NumericFormatCustom '
import InputSelect from '@/components/InputSelect'
import InputBasic from '@/components/InputBasic'
import { Button } from '@mui/material'
import { FiSave, FiXCircle } from 'react-icons/fi'

function UpdateAppointmentPage() {
	const {
		appointment,
		patientData,
		handleSave,
		handleCancel,
		handleChangeCost,
		handleChangeInput,
		handleChangeInputDate,
		handleChangeSelectInput,
	} = useUpdateAppointmentPage()
	return (
		<>
			<HeadComponent title={`Cita de`} />
			<Navbar />
			<main className="update-appointment-page_main">
				<header className="main_header">
					<h1>Modificar cita {patientData.name}</h1>
				</header>
				<form className="main_form">
					<div className="form_content">
						<InputDate
							name="date"
							key="date"
							label="Fecha de la cita"
							value={appointment.date}
							onChange={handleChangeInputDate}
							helperText={appointment.formatDate}
							disabled
						/>
						<InputNumericFormat
							id="cost"
							key="cost"
							label="Costo"
							value={appointment.cost}
							onChange={value => {
								handleChangeCost(value)
							}}
						/>
						<InputSelect
							key="doctor"
							id="doctor"
							label="Doctor"
							value={appointment.doctor}
							onChange={handleChangeSelectInput}
							items={[
								{
									item: 'Lorena',
									value: 'Lorena',
								},
								{
									item: 'Marenco',
									value: 'Marenco',
								},
							]}
						/>
						<InputBasic
							multiline
							type="text"
							id="treatment"
							key="treatment"
							label="Tratamiento"
							value={appointment.treatment}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="btn_group">
						<Button
							variant="contained"
							color="success"
							onClick={handleSave}
							startIcon={<FiSave />}
						>
							Solo guardar
						</Button>
						<Button
							color="error"
							type="button"
							variant="outlined"
							onClick={handleCancel}
							startIcon={<FiXCircle />}
						>
							Cancelar
						</Button>
					</div>
				</form>
			</main>
		</>
	)
}

export default UpdateAppointmentPage
