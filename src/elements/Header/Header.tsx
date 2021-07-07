import React, { memo, useState } from 'react'
import { Container } from '@elements'
import { useSiteMetadata } from '@hooks'
import { gql, useQuery } from '@apollo/client'
import Pagination from '../Pagination/Pagination'

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const query = gql`
    query Fetch($pagination: PaginationArgs!) {
      paginateGolfClubModels(pagination: $pagination) {
        content {
          id
          name
          description
          retailPrice
          avatar
          isCached @client
          brand {
            name
          }
        }
        pagination {
          pageSize
          totalPages
        }
      }
    }
  `

  const [page, setPage] = useState(1)

  const { data, loading, error } = useQuery(query, { variables: { pagination: { page: page, pageSize: 12 } } })
  console.log(data)

  const paginateGolfClubModels = (data && data.paginateGolfClubModels) || { content: [] }
  if (loading || !paginateGolfClubModels) return null

  return (
    <div>
      <div className={'header'}>
        <div className={'w-full px-20 mx-auto mx-30 my-30 flex justify-center flex-wrap font-sans'}>
          {data.paginateGolfClubModels.content.map(item => {
            const { id, brand:{name}, retailPrice, avatar } = item

            return (
              <div key={id} className={'w-1/5 shadow-gray rounded-15 mr-40 mb-40'}>
                <img className={'rounded-t-15'} src={`https://hotcakegolf.brightlab.solutions${avatar}`} alt="" />
                <div className={'pt-10 px-20 pb-20 bg-gray-100'}>
                  <p className={'text-14'} style={{ color: 'gray' }}>
                    {name}
                  </p>
                  <p className={'text-16'}>{name}</p>
                  <p className={'text-20 text-black'}>${retailPrice}</p>
                </div>
              </div>
            )
          })}
        </div>
        <Pagination current={page} totalPages={data.paginateGolfClubModels.pagination.pageSize} onClick={setPage} />
      </div>
    </div>
  )
}

export default memo(Header)
