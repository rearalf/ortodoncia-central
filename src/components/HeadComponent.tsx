import Head from 'next/head'
import React from 'react'

const HeadComponent = () => {
	return (
		<Head>
			<link rel="icon" href="/icons/icon32x32.png" sizes="32x32" />
			<link rel="icon" href="/icons/icon192x192.png" sizes="192x192" />
			<link rel="apple-touch-icon" href="/icons/icon270x270.png" sizes="270x270" />
			<meta name="msapplication-TileImage" content="/icons/icon270x270.png"></meta>
		</Head>
	)
}

export default HeadComponent
