import React, {memo, useState} from 'react'
import {RouteComponentProps} from '@reach/router'
import {gql, useQuery} from "@apollo/client";
import Pagination from "../elements/Pagination/Pagination";

interface HomeProps extends RouteComponentProps {
}

const Home: React.FC<HomeProps> = props => {
    const query = gql`
    query Fetch($pagination: PaginationArgs!) {
      paginateGolfClubModels(pagination: $pagination) {
        content {
          id
          name
          description
          retailPrice
          avatar
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

    const {data, loading, error} = useQuery(query, {variables: {pagination: {page: page, pageSize: 12}}})
    console.log(data)

    const paginateGolfClubModels = (data && data.paginateGolfClubModels) || {content: []}
    if (loading || !paginateGolfClubModels) return null


    return (
        <div>

            <div className={'header'}>
                <div className={'w-full px-20 mx-auto mx-30 my-30 flex justify-center flex-wrap font-sans'}
                     style={{color: 'DarkCyan'}}><h1>Putter list</h1></div>
                <div className={'w-full px-20 mx-auto mx-30 my-30 flex justify-center flex-wrap font-sans'}>
                    {data.paginateGolfClubModels.content.map(item => {
                        const {id, brand: {name}, retailPrice, avatar} = item

                        return (
                            <div key={id} className={'w-1/5 shadow-gray rounded-15 mr-40 mb-40'}>
                                <img className={'rounded-t-15'} src={`https://hotcakegolf.brightlab.solutions${avatar}`}
                                     alt=""/>
                                <div className={'pt-10 px-20 pb-20 bg-gray-100'}>
                                    <p className={'text-15'} style={{color: 'DarkCyan'}}>
                                        {name}
                                    </p>
                                    <p className={'text-20 text-black'}>${retailPrice}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={'w-full px-20 mx-auto mx-30 my-30 flex justify-center flex-wrap font-sans'}>
                    <Pagination current={page} totalPages={data.paginateGolfClubModels.pagination.pageSize}
                                onClick={setPage}/>
                </div>

            </div>
        </div>
    )
}

export default memo(Home)
