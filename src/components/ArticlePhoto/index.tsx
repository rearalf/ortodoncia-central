import styles from '@/styles/PhtosPage.module.css'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { IconButton } from '@mui/material'

interface ArticlePhotoProps {
	id: string
	formatDate: string | undefined
	description: string
	imagesLinks: string[]
	imagesNames: string[]
	openImageViewer: (value: string) => void
	handleDeleteArticle: (id: string, imagesNames: string[]) => void
	handleGoToUpdatePhotos: (id: string) => void
}

const ArticlePhoto = (props: ArticlePhotoProps) => {
	return (
		<article key={props.id} className={styles.article}>
			<header className={styles.header}>
				<h2>{props.formatDate?.toLocaleUpperCase()}</h2>
				<div>
					<IconButton
						aria-label="Eliminar"
						color="error"
						onClick={() => props.handleDeleteArticle(props.id, props.imagesNames)}
					>
						<FiTrash />
					</IconButton>
					<IconButton
						aria-label="Editar"
						color="info"
						onClick={() => props.handleGoToUpdatePhotos(props.id)}
					>
						<FiEdit />
					</IconButton>
				</div>
			</header>
			<div className="article_description">
				{props.description.split('\n').map((line, index) => (
					<p key={index}>{line}</p>
				))}
			</div>
			<div className={styles.photos}>
				{typeof props.imagesLinks !== 'string' &&
					props.imagesLinks.map((imagesLink, i) => (
						<img
							src={imagesLink}
							className={styles.photo}
							alt={props.imagesNames[i]}
							key={props.imagesNames[i]}
							onClick={() => props.openImageViewer(imagesLink)}
						/>
					))}
			</div>
		</article>
	)
}

export default ArticlePhoto
