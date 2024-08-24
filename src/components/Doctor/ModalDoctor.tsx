import { Button, IconButton, Modal } from '@mui/material'
import { FiSave, FiX, FiXCircle } from 'react-icons/fi'
import useDoctorsState from '@/states/doctosState'
import InputBasic from '../InputBasic'
import { FormEvent } from 'react'

interface Props {
	handleCreateDoctor: (e: FormEvent<HTMLFormElement>) => void
	handleUpdateDoctor: (e: FormEvent<HTMLFormElement>) => void
	handleDeleteDoctor: (e: FormEvent<HTMLFormElement>) => void
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
						action === 'create'
							? props.handleCreateDoctor
							: action === 'edit'
							? props.handleUpdateDoctor
							: props.handleDeleteDoctor
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
						{action === 'create'
							? 'Agregar nuevo doctor'
							: action === 'edit'
							? 'Editar doctor'
							: 'Eliminar doctor'}
					</h2>

					{action === 'delete' && <p>Esta acción será irreversible.</p>}

					<InputBasic
						required
						type="text"
						id="fullName"
						value={inputValue}
						error={error.error}
						helperText={error.helperText}
						disabled={action === 'delete'}
						placeholder="Nombre del doctor"
						onChange={value => setInputValue(value.target.value)}
					/>

					<div className="btn_group">
						<Button
							type="submit"
							color={action === 'delete' ? 'error' : 'success'}
							variant="contained"
							startIcon={<FiSave />}
						>
							{action === 'create'
								? 'Guardar'
								: action == 'edit'
								? 'Editar'
								: 'Eliminar'}
						</Button>
						<Button
							color={action === 'delete' ? 'info' : 'error'}
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
