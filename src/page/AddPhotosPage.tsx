import { Button, IconButton, LinearProgress, Tooltip } from '@mui/material'
import { FiSave, FiUploadCloud, FiXCircle } from 'react-icons/fi'
import BackdropLoading from '@/components/BackdropLoading'
import HeadComponent from '@/components/HeadComponent'
import ImageViewer from 'react-simple-image-viewer'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import useAddPhotos from '@/hooks/useAddPhotos'
import Navbar from '@/components/Navbar'
import '@/styles/AddPhotosPage.css'

const AddPhotosPage = () => {
	const {
		images,
		loading,
		progress,
		titleName,
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
	} = useAddPhotos()
	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title="Agregar imagenes al expediente" />
			<Navbar />
			<main className="add_x_rays_page-main">
				<BreadCrumbs
					links={[
						{
							link_name: 'Inicio',
							link_to: '/',
						},
						{
							link_name: `Paciente ${titleName}`,
							link_to: `/patient-profile/${patientData.id}`,
						},
						{
							link_name: 'Fotos e imagenes',
							link_to: `/patient-profile/${patientData.id}/photos`,
						},
						{
							link_name: 'Agregar fotos e imagenes',
							link_to: `/patient-profile/${patientData.id}/photos/add-photos`,
						},
					]}
				/>
				<h1 className="main-title">Agregar fotos e imagenes</h1>
				<form className="main-form" onSubmit={handleSavePhotos}>
					<div className="form-inputs_section">
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
								className={`drap_drop-content ${isDragging && 'isDragging'}`}
							>
								<FiUploadCloud size={40} />
								{isDragging ? (
									<h2 className="content-title">Suelta para agregar</h2>
								) : (
									<h2 className="content-title">
										Arrastra y suelta <br /> tus imagenes aqui
									</h2>
								)}
								<input
									multiple
									type="file"
									id="upload-files"
									className="content-input_file"
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
				{numberImages !== 0 && (
					<div className="main-loading">
						<h3 className="loading-title">{numberImages}</h3>
						<LinearProgress variant="determinate" value={progress} />
					</div>
				)}
				<div className="main-images">
					{images.map((image, index) => (
						<div className="images-content" key={image}>
							<Tooltip title="Eliminar imagen">
								<IconButton
									color="error"
									onClick={() => handleDeleteImage(index)}
									className="content-delete_button"
								>
									<FiXCircle size={30} />
								</IconButton>
							</Tooltip>
							<Button onClick={() => openImageViewer(index)}>
								<img src={image} className="content-img" />
							</Button>
						</div>
					))}
				</div>
			</main>
			{isViewerOpen && (
				<ImageViewer
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

export default AddPhotosPage
