import { Button, IconButton, LinearProgress, Tooltip } from '@mui/material'
import { FiSave, FiUploadCloud, FiXCircle } from 'react-icons/fi'
import ReactSimpleImageViewer from 'react-simple-image-viewer'
import useUpdatePhotosPage from '@/hooks/useUpdatePhotosPage'
import BackdropLoading from '@/components/BackdropLoading'
import HeadComponent from '@/components/HeadComponent'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import Navbar from '@/components/Navbar'

function UpdatePhotosPage() {
	const {
		images,
		loading,
		progress,
		isDragging,
		description,
		patientData,
		numberImages,
		currentImage,
		isViewerOpen,
		onDrop,
		onDragOver,
		onDragLeave,
		openImageViewer,
		closeImageViewer,
		handleChangeFile,
		handleSavePhotos,
		handleDeleteImage,
		handleCancelButton,
		handleOnChangeInput,
	} = useUpdatePhotosPage()
	return (
		<>
			<BackdropLoading loading={loading} />
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
							link_name: 'Fotos e imagenes',
							link_to: `/patient-profile/${patientData.id}/photos`,
						},
						{
							link_name: 'Modificar fotos e imagenes',
							link_to: `/patient-profile/${patientData.id}/photos/add-photos`,
						},
					]}
				/>
				<h1 className="main_title">Modificar fotos e imagenes</h1>
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
							<div
								onDrop={onDrop}
								onDragOver={onDragOver}
								onDragLeave={onDragLeave}
								className={`drap-drop_content ${isDragging && 'isDragging'}`}
							>
								<FiUploadCloud size={40} />
								{isDragging ? (
									<h2 className="content_title">Suelta para agregar</h2>
								) : (
									<h2 className="content_title">
										Arrastra y suelta <br /> tus imagenes aqui
									</h2>
								)}
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

					<div className="btn_group">
						<Button
							variant="contained"
							color="success"
							type="submit"
							startIcon={<FiSave />}
						>
							Actualizar
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
				{numberImages !== 0 && (
					<div className="main_loading">
						<h3 className="loading_title">{numberImages}</h3>
						<LinearProgress variant="determinate" value={progress} />
					</div>
				)}
				<div className="main_images">
					{images.map((image, index) => (
						<div className="images_content" key={image}>
							<Tooltip title="Eliminar imagen">
								<IconButton
									color="error"
									onClick={() => handleDeleteImage(index, image)}
									className="imagens_delete-button"
								>
									<FiXCircle size={30} />
								</IconButton>
							</Tooltip>
							<Button onClick={() => openImageViewer(index)}>
								<img src={image} className="images_img" />
							</Button>
						</div>
					))}
				</div>
			</main>
			{isViewerOpen && (
				<ReactSimpleImageViewer
					src={images}
					currentIndex={currentImage}
					disableScroll={false}
					closeOnClickOutside={true}
					onClose={closeImageViewer}
					backgroundStyle={{
						backgroundColor: '#000000f0',
					}}
				/>
			)}
		</>
	)
}

export default UpdatePhotosPage
