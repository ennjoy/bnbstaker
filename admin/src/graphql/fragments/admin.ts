import { gql } from '@apollo/client/core'

export const ADMIN_FRAGMENT = gql`
    fragment AdminFragment on Admin {
        id
        username
        role
        owner
        address
        active
        invitesCount
    }
`