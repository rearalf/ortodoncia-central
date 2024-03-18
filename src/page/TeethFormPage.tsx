import { Button } from '@mui/material'
import Navbar from '@/components/Navbar'
import TeethForm from '@/components/TeethForm'
import InputDate from '@/components/InputDate'
import InputBasic from '@/components/InputBasic'
import { FiSave, FiXCircle } from 'react-icons/fi'
import InputSelect from '@/components/InputSelect'
import HeadComponent from '@/components/HeadComponent'
import useTeethFormPage from '@/hooks/useTeethFormPage'
import InputNumericFormat from '@/components/NumericFormatCustom '
import '@/styles/TeethFormPage.css'

const TeethFormPage = () => {
	const {
		appointment,
		patientData,
		handleSaveTeeth,
		handleChangeCost,
		handleChangeInput,
		handleCancelButton,
		handleChangeInputDate,
		handleChangeSelectInput,
	} = useTeethFormPage()
	return (
		<>
			<HeadComponent title="Odontograma de " />
			<Navbar />
			<main className="teethform_main">
				<h1 className="main_title">
					Odontograma de{' '}
					{` ${patientData.name.split(' ')[0]} ${
						patientData.name.split(' ')[2]
							? patientData.name.split(' ')[2]
							: patientData.name.split(' ')[1]
					}`}
				</h1>

				<TeethForm />

				<form onSubmit={handleSaveTeeth} className="main_lastform">
					<h2 className="lastform_title">Cita de hoy</h2>
					<div className="lastform_form">
						<InputDate
							name="date"
							key="date"
							label="Fecha de la cita"
							value={appointment.date}
							onChange={handleChangeInputDate}
							helperText="MM/DD/YYYY"
							disabled
						/>
						<InputNumericFormat
							required
							id="cost"
							key="cost"
							label="Costo"
							value={appointment.cost}
							onChange={value => {
								handleChangeCost(value)
							}}
						/>
						<InputSelect
							required
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
							required
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
							type="submit"
							startIcon={<FiSave />}
						>
							Guardar
						</Button>
						<Button
							variant="outlined"
							color="error"
							type="button"
							onClick={handleCancelButton}
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

export default TeethFormPage
