import { gql } from '@apollo/client/core'
import { ADMIN_FRAGMENT, AVAILABLE_FRAGMENT, USER_FRAGMENT } from '../fragments'

export const INVITES_QUERY = gql`
    ${ ADMIN_FRAGMENT }
    ${ AVAILABLE_FRAGMENT }
    ${ USER_FRAGMENT }
    query Invites ($owner: ID $query: String $skip: Float $take: Float) {
        me {
            ...AdminFragment
        }
        available {
            ...AvailableFragment
        }
        invites (owner: $owner query: $query skip: $skip take: $take) {
            ...UserFragment
        }
    }
`
