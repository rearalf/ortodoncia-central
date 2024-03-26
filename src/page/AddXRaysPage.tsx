import { FiSave, FiUploadCloud, FiXCircle } from 'react-icons/fi'
import { Button, IconButton, Tooltip } from '@mui/material'
import HeadComponent from '@/components/HeadComponent'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import useAddXRays from '@/hooks/useAddXRays'
import Navbar from '@/components/Navbar'
import '@/styles/AddXRaysPage.css'

const AddXRaysPage = () => {
	const {
		images,
		description,
		patientData,
		handleChangeFile,
		handleSavePhotos,
		handleDeleteImage,
		handleCancelButton,
		handleOnChangeInput,
	} = useAddXRays()
	return (
		<>
			<HeadComponent title="Agregar imagenes al expediente" />
			<Navbar />
			<main className="add-x-rays-page_main">
				<BreadCrumbs
					links={[
						{
							link_name: 'Inicio',
							link_to: '/',
						},
						{
							link_name: `Paciente ${patientData.name.split(' ')[0]} ${
								patientData.name.split(' ')[2]
									? patientData.name.split(' ')[2]
									: patientData.name.split(' ')[1]
							}`,
							link_to: `/patient-profile/${patientData.id}`,
						},
						{
							link_name: 'Agregar imagens al expediente',
							link_to: `/patient-profile/${patientData.id}/add-xrays`,
						},
					]}
				/>
				<h1 className="main_title">Agregar imagens al expediente</h1>
				<form className="main_form" onSubmit={handleSavePhotos}>
					<div className="form_first-section">
						<InputBasic
							required
							multiline
							type="text"
							id="description"
							key="description"
							label="Descripción de las imagenes"
							value={description}
							onChange={handleOnChangeInput}
						/>
						<label htmlFor="upload-files">
							<div className="drap-drop_content">
								<FiUploadCloud size={40} />
								<h2 className="content_title">
									Arrastra y suelta <br /> tus imagenes aqui
								</h2>
								<input
									multiple
									type="file"
									id="upload-files"
									className="content_input-file"
									onChange={handleChangeFile}
								/>
								<Button variant="contained" startIcon={<FiUploadCloud />}>
									<label htmlFor="upload-files">Selecciona tus imagenes</label>
								</Button>
							</div>
						</label>
					</div>
					<div className="form_draq-drop"></div>
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
				<div className="main_images">
					{images.map((image, index) => (
						<div className="images_content" key={image}>
							<Tooltip title="Eliminar imagen">
								<IconButton
									color="error"
									onClick={() => handleDeleteImage(index)}
									className="imagens_delete-button"
								>
									<FiXCircle size={30} />
								</IconButton>
							</Tooltip>
							<img src={image} className="images_img" />
						</div>
					))}
				</div>
			</main>
		</>
	)
}

export default AddXRaysPage
