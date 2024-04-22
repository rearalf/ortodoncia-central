'use client'
import { Button, IconButton, LinearProgress, Tooltip } from '@mui/material'
import { FiSave, FiUploadCloud, FiXCircle } from 'react-icons/fi'
import ReactSimpleImageViewer from 'react-simple-image-viewer'
import BackdropLoading from '@/components/BackdropLoading'
import styles from '@/styles/AddPhotosPage.module.css'
import BreadCrumbs from '@/components/BreadCrumbs'
import InputBasic from '@/components/InputBasic'
import useAddPhotos from '@/hooks/useAddPhotos'
import Navbar from '@/components/Navbar'

function AddPhotosPage({ params }: { params: { id_patient: string } }) {
	const {
		links,
		images,
		loading,
		progress,
		isDragging,
		description,
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
	} = useAddPhotos(params.id_patient)
	return (
		<>
			<BackdropLoading loading={loading} />
			<Navbar />
			<main className={styles.main}>
				<BreadCrumbs links={links} />
				<h1 className={styles.title}>Agregar fotos e imagenes</h1>
				<form className={styles.form} onSubmit={handleSavePhotos}>
					<div className={styles.inputs_section}>
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
								className={`${styles.drap_drop_content} ${
									isDragging && styles.is_dragging
								}`}
							>
								<FiUploadCloud size={40} />
								{isDragging ? (
									<h2 className={styles.upload_title}>Suelta para agregar</h2>
								) : (
									<h2 className={styles.upload_title}>
										Arrastra y suelta <br /> tus imagenes aqui
									</h2>
								)}
								<input
									multiple
									type="file"
									id="upload-files"
									className={styles.input_file}
									onChange={handleChangeFile}
								/>
								<Button variant="contained" startIcon={<FiUploadCloud />}>
									<label htmlFor="upload-files">Selecciona tus imagenes</label>
								</Button>
							</div>
						</label>
					</div>
					<div className={styles.btn_group}>
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
					<div className={styles.loading_section}>
						<h3 className={styles.loading_title}>{numberImages}</h3>
						<LinearProgress variant="determinate" value={progress} />
					</div>
				)}
				<div className={styles.images}>
					{images.map((image, index) => (
						<div className={styles.images_content} key={image}>
							<Tooltip title="Eliminar imagen">
								<IconButton
									color="error"
									onClick={() => handleDeleteImage(index)}
									className={styles.delete_button}
								>
									<FiXCircle size={30} />
								</IconButton>
							</Tooltip>
							<Button onClick={() => openImageViewer(index)}>
								<img src={image} className={styles.content_img} />
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

export default AddPhotosPage
