import React, { memo, useState } from 'react'
import { PaginationResponse } from '@types'

interface PaginationProps {
    limit?: number
    onClick(page: number): void
        current: number
    totalPages?: number
    className?: string
}

const Pagination: React.FC<PaginationProps> = props => {
    const { current, totalPages = 5, limit = 10, onClick, className } = props

    // if (!current) return null

    const pagesOffset = Math.floor(limit / 2)

    const isFirstPages = current <= pagesOffset

    const isLastPages = current + pagesOffset > totalPages!

        let start: number
    let end: number

    if (isFirstPages) {
        start = 1
        end = Math.min(limit, totalPages!)
    } else if (isLastPages) {
        start = Math.max(totalPages! - (limit - 1), 1)
        end = totalPages!
    } else {
        start = current - pagesOffset
        end = Math.min(current + pagesOffset, totalPages!)
    }

    const renderPages = () => {
        return new Array(limit).fill(0).map((_, index) => {
            const page = start + index

            if (page > end) return
            const isActive = page === current

            return (
                <li
                    key={index}
                    tabIndex={0}
                    className={`grid place-content-center w-42 h-42 border border-l-0 border-black-100 cursor-pointer ${
                        isActive
                            ? 'bg-green-1000 text-white border border-green-1000'
                            : 'bg-white  hover:bg-green-100 text-green-800'
                    }`}
                    onClick={() => onClick(page)}
                    data-active={isActive}
                >
                    {page}
                </li>
            )
        })
    }

    return (
        <nav className={className} role="pagination">
            <ul className={'flex'}>
                <li
                    className={`flex w-42 h-42 bg-white text-green-800 justify-center items-center border border-black-100 rounded-l-md ${
                        current === 1 ? 'cursor-default' : 'cursor-pointer hover:bg-green-100'
                    }`}
                    onClick={current !== 1 ? () => onClick(1) : undefined}
                >
                    &laquo;
                </li>
                {renderPages()}
                <li
                    className={`flex w-42 h-42 bg-white text-green-800 justify-center items-center border border-l-0 border-black-100 rounded-r-md ${
                        current === totalPages ? 'cursor-default' : 'cursor-pointer hover:bg-green-100'
                    }`}
                    onClick={current !== totalPages ? () => onClick(totalPages) : undefined}
                >
                    &raquo;
                </li>
            </ul>
        </nav>
    )
}

export default memo(Pagination)