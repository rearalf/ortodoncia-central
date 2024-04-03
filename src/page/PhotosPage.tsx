import { FiChevronLeft, FiChevronRight, FiUpload } from 'react-icons/fi'
import BackdropLoading from '@/components/BackdropLoading'
import HeadComponent from '@/components/HeadComponent'
import ImageViewer from 'react-simple-image-viewer'
import BreadCrumbs from '@/components/BreadCrumbs'
import usePhotosPage from '@/hooks/usePhotosPage'
import { Button, Tooltip } from '@mui/material'
import Navbar from '@/components/Navbar'
import '@/styles/PhtosPage.css'

const PhtosPage = () => {
	const {
		page,
		data,
		images,
		loading,
		totalPage,
		patientData,
		currentImage,
		isViewerOpen,
		getNextPhotos,
		getBeforePhotos,
		openImageViewer,
		closeImageViewer,
		handleGoToAddPhotos,
	} = usePhotosPage()
	return (
		<>
			<BackdropLoading loading={loading} />
			<HeadComponent title={`Perfil de ${patientData.name}`} />
			<Navbar />
			<main className="photos-page_main">
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
						<article key={photo.id} className="content_article">
							<h3 className="article_title">
								{photo.formatDate?.toLocaleUpperCase()}
							</h3>
							<div className="article_description">
								{photo.description.split('\n').map((line, index) => (
									<p key={index}>{line}</p>
								))}
							</div>
							<div className="article_photos">
								{typeof photo.imagesLinks !== 'string' &&
									photo.imagesLinks.map((imagesLink, i) => (
										<img
											src={imagesLink}
											alt={photo.imagesNames[i]}
											key={photo.imagesNames[i]}
											className="photo-button_photo"
											onClick={() => openImageViewer(imagesLink)}
										/>
									))}
							</div>
						</article>
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

export default PhtosPage
