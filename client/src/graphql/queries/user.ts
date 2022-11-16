import { gql } from '@apollo/client/core'
import { USER_FRAGMENT } from '../fragments'

export const USER_QUERY = gql`
    ${ USER_FRAGMENT }
    query User (
        $owner: String!
        $address: String!

        $invested: PiwArg
        $withdrawn: PiwArg
    ) {
        user (
            owner: $owner
            address: $address

            invested: $invested
            withdrawn: $withdrawn
        ) {
            ...UserFragment
        }
    }
`

export const IS_WITHDRAWN_QUERY = gql`
    query IsWithdrawn ($address: String!) {
        isWithdrawn (address: $address)
    }
`