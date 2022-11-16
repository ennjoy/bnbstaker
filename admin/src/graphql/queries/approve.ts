import { gql } from '@apollo/client/core'
import { ADMIN_FRAGMENT } from '../fragments'

export const APPROVES_QUERY = gql`
    ${ ADMIN_FRAGMENT }
    query Approves ($query: String $type: Float $skip: Float $take: Float) {
        me {
            ...AdminFragment
        }
        approves (query: $query type: $type skip: $skip take: $take) {
            createdAt
            id
            owner
            approve
            author {
                address
            }
        }
    }
`