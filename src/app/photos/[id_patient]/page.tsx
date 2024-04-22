'use client'
import { FiChevronLeft, FiChevronRight, FiUpload } from 'react-icons/fi'
import DialogDeletePhotos from '@/components/DialogDeletePhotos'
import BackdropLoading from '@/components/BackdropLoading'
import ArticlePhoto from '@/components/ArticlePhoto'
import ImageViewer from 'react-simple-image-viewer'
import styles from '@/styles/PhtosPage.module.css'
import BreadCrumbs from '@/components/BreadCrumbs'
import usePhotosPage from '@/hooks/usePhotosPage'
import { Button, Tooltip } from '@mui/material'
import Navbar from '@/components/Navbar'

function PhotosPage({ params }: { params: { id_patient: string } }) {
	const {
		page,
		data,
		links,
		images,
		loading,
		idSelect,
		openModal,
		totalPage,
		currentImage,
		isViewerOpen,
		getNextPhotos,
		getBeforePhotos,
		openImageViewer,
		closeImageViewer,
		handleOpenDialog,
		handleCancelDialog,
		handleDeleteDialog,
		handleGoToAddPhotos,
		handleGoToUpdatePhotos,
	} = usePhotosPage(params.id_patient)
	return (
		<>
			<BackdropLoading loading={loading} />
			<Navbar />
			<DialogDeletePhotos
				openModal={openModal}
				handleDeleteDialog={handleDeleteDialog}
				handleCancelDialog={handleCancelDialog}
				data={idSelect}
			/>
			<main className={styles.main}>
				<BreadCrumbs links={links} />
				<header className={styles.header}>
					<h1>Fotos e imagenes</h1>
					<Button
						variant="contained"
						startIcon={<FiUpload />}
						onClick={handleGoToAddPhotos}
					>
						Agregar imagenes
					</Button>
				</header>
				<div className={styles.content}>
					{data.map(photo => (
						<ArticlePhoto
							id={photo.id}
							key={photo.id}
							description={photo.description}
							formatDate={photo.formatDate}
							imagesLinks={photo.imagesLinks}
							imagesNames={photo.imagesNames}
							openImageViewer={openImageViewer}
							handleDeleteArticle={handleOpenDialog}
							handleGoToUpdatePhotos={handleGoToUpdatePhotos}
						/>
					))}
				</div>
				<div className="main_btn-group">
					{page === 1 ? (
						''
					) : (
						<Tooltip title="Anterior" arrow>
							<Button variant="contained" onClick={getBeforePhotos}>
								<FiChevronLeft size={28} />
							</Button>
						</Tooltip>
					)}
					{totalPage === page ? (
						''
					) : (
						<Tooltip title="Siguiente" arrow>
							<Button variant="contained" onClick={getNextPhotos}>
								<FiChevronRight size={28} />
							</Button>
						</Tooltip>
					)}
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

export default PhotosPage
