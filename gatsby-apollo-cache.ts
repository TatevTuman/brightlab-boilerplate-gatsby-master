import { gql, InMemoryCache, makeVar } from '@apollo/client'
import { CacheModal } from '@types'
import possibleTypes from './gatsby-apollo-cache-types.json'

export const modalsVar = makeVar<CacheModal[]>([])
export const overlayVar = makeVar<boolean>(false)

const cache = new InMemoryCache({
  possibleTypes,
  typePolicies: {
    Query: {
      fields: {
        modals: {
          read() {
            return modalsVar()
          }
        },
        overlay: {
          read() {
            return overlayVar()
          }
        }
      }
    },
    GolfClubModel: {
      fields: {
        isCached(isCached, { cache }) {
          return true
        }
      }
    }
  }
})

export default cache
