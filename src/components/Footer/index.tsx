import { Container } from '@mui/material'
import './styles.css'

const Footer = () => {
	return (
		<footer className="footer">
			<Container maxWidth="xl" className='container_footer'>
				<div className="footer_container">
					<a
						href="/manual.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="manual_link"
					>
						Manual
					</a>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
