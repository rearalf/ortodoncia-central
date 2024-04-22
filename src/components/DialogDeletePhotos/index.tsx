import { FiTrash, FiXCircle } from 'react-icons/fi'
import { Button, Dialog } from '@mui/material'
import styles from '@/styles/PhtosPage.module.css'

interface DialogDeletePhotosProps {
	openModal: boolean
	handleCancelDialog: () => void
	handleDeleteDialog: () => void
	data: {
		id: string
		imagesNames: string[]
		totalImageDeleted: number
	}
}

const DialogDeletePhotos = (props: DialogDeletePhotosProps) => {
	return (
		<Dialog open={props.openModal} className={styles.delete_dialog}>
			<h1>Seguro desea eliminarlo?</h1>
			<p>
				Eliminara {props.data.totalImageDeleted} fotos y descripción y no podra ser
				recuperado nada.
			</p>

			<div className={styles.btn_group}>
				<Button
					variant="contained"
					color="error"
					startIcon={<FiTrash />}
					onClick={props.handleDeleteDialog}
				>
					Eliminar
				</Button>
				<Button
					variant="outlined"
					color="warning"
					startIcon={<FiXCircle />}
					onClick={props.handleCancelDialog}
				>
					Cancelar
				</Button>
			</div>
		</Dialog>
	)
}

export default DialogDeletePhotos
