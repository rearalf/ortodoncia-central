import { Button, IconButton, Modal } from '@mui/material'
import { FiSave, FiX, FiXCircle } from 'react-icons/fi'
import useDoctorsState from '@/states/doctosState'
import InputBasic from '../InputBasic'
import { FormEvent } from 'react'

interface Props {
	handleCreateDoctor: (e: FormEvent<HTMLFormElement>) => void
	handleUpdateDoctor: (e: FormEvent<HTMLFormElement>) => void
}

const ModalDoctor = (props: Props) => {
	const { inputValue, action, error, setInputValue, showModal, setShowModal } = useDoctorsState()
	return (
		<Modal
			open={showModal}
			aria-labelledby="Formulario para doctores"
			aria-describedby="Puede crear o modificar los doctores"
		>
			<div className="modal_doctor">
				<form
					className="doctot_form"
					onSubmit={
						action === 'create' ? props.handleCreateDoctor : props.handleUpdateDoctor
					}
				>
					<IconButton
						color="error"
						className="close_button"
						onClick={() => setShowModal(false)}
					>
						<FiX />
					</IconButton>
					<h2 className="form_title">
						{action === 'create' ? 'Agregar nuevo doctor' : 'Editar doctor'}
					</h2>

					<InputBasic
						required
						type="text"
						id="fullName"
						value={inputValue}
						error={error.error}
						helperText={error.helperText}
						placeholder="Nombre del doctor"
						onChange={value => setInputValue(value.target.value)}
					/>

					<div className="btn_group">
						<Button
							type="submit"
							color="success"
							variant="contained"
							startIcon={<FiSave />}
						>
							{action === 'create' ? 'Guardar' : 'Editar'}
						</Button>
						<Button
							color="error"
							type="button"
							variant="outlined"
							onClick={() => setShowModal(false)}
							startIcon={<FiXCircle />}
						>
							Cancelar
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

export default ModalDoctor
