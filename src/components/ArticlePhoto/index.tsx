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
}

const ArticlePhoto = (props: ArticlePhotoProps) => {
	return (
		<article key={props.id} className="content_article">
			<header className="article_header">
				<h2 className="header_title">{props.formatDate?.toLocaleUpperCase()}</h2>
				<div className="header_btn-group">
					<IconButton
						aria-label="Eliminar"
						color="error"
						onClick={() => props.handleDeleteArticle(props.id, props.imagesNames)}
					>
						<FiTrash />
					</IconButton>
					<IconButton aria-label="Editar" color="info">
						<FiEdit />
					</IconButton>
				</div>
			</header>
			<div className="article_description">
				{props.description.split('\n').map((line, index) => (
					<p key={index}>{line}</p>
				))}
			</div>
			<div className="article_photos">
				{typeof props.imagesLinks !== 'string' &&
					props.imagesLinks.map((imagesLink, i) => (
						<img
							src={imagesLink}
							alt={props.imagesNames[i]}
							key={props.imagesNames[i]}
							className="photo-button_photo"
							onClick={() => props.openImageViewer(imagesLink)}
						/>
					))}
			</div>
		</article>
	)
}

export default ArticlePhoto
