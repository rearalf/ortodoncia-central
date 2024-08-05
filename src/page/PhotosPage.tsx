import { FiChevronLeft, FiChevronRight, FiUpload } from 'react-icons/fi'
import DialogDeletePhotos from '@/components/DialogDeletePhotos'
import BackdropLoading from '@/components/BackdropLoading'
import HeadComponent from '@/components/HeadComponent'
import ArticlePhoto from '@/components/ArticlePhoto'
import ImageViewer from 'react-simple-image-viewer'
import BreadCrumbs from '@/components/BreadCrumbs'
import usePhotosPage from '@/hooks/usePhotosPage'
import { Button, Tooltip } from '@mui/material'
import Navbar from '@/components/Navbar'
import '@/styles/PhtosPage.css'
import Footer from '@/components/Footer'

const PhtosPage = () => {
	const {
		page,
		data,
		images,
		loading,
		idSelect,
		titleName,
		openModal,
		totalPage,
		patientData,
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
	} = usePhotosPage()
	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title={`Perfil de ${patientData.name}`} />
			<Navbar />
			<DialogDeletePhotos
				openModal={openModal}
				handleDeleteDialog={handleDeleteDialog}
				handleCancelDialog={handleCancelDialog}
				data={idSelect}
			/>
			<main className="photos-page_main">
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
							link_name: `Fotos e imagenes`,
							link_to: `/patient-profile/${patientData.id}/photos`,
						},
					]}
				/>
				<header className="main_header">
					<h1 className="header_title">Fotos e imagenes</h1>
					<Button
						variant="contained"
						startIcon={<FiUpload />}
						onClick={handleGoToAddPhotos}
					>
						Agregar imagenes
					</Button>
				</header>
				<div className="main_content">
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
			<Footer />
		</>
	)
}

export default PhtosPage
