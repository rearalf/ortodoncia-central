import { Box, IconButton } from '@mui/material'
import React from 'react'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

interface TablePaginationActionsProps {
	count: number
	page: number
	rowsPerPage: number
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
	const { count, page, rowsPerPage, onPageChange } = props

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, 0)
	}

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1)
	}

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1)
	}

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="Primera página"
			>
				<FiChevronsLeft />
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="Pagina anterior"
			>
				<FiChevronLeft />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Siguiente página"
			>
				<FiChevronRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Última página"
			>
				<FiChevronsRight />
			</IconButton>
		</Box>
	)
}

export default TablePaginationActions
