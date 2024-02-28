import { Helmet } from 'react-helmet-async'

interface HeaderComponentProps {
	title: string
}

const HeadComponent = (props: HeaderComponentProps) => {
	return (
		<Helmet>
			<title>Orotodoncia central | {props.title} </title>
			<meta name="description" content={'Ortodoncia central'}></meta>
			<meta name="author" content="Ortodoncia central"></meta>
			<link rel="icon" href="/icons/icon32x32.png" sizes="32x32" />
			<link rel="icon" href="/icons/icon192x192.png" sizes="192x192" />
			<link rel="apple-touch-icon" href="/icons/icon270x270.png" sizes="270x270" />
		</Helmet>
	)
}

export default HeadComponent
