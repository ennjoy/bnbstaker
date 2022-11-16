import { gql } from '@apollo/client/core'

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        id
        owner
        address
        withdraw
        approve
    }
`