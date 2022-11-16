import { gql } from '@apollo/client/core'
import { USER_FRAGMENT } from '../fragments'

export const APPROVE_MUTATION = gql`
    ${ USER_FRAGMENT }
    mutation ($input: CreateApproveInput!) {
        approve (input: $input) {
            ...UserFragment
        }
    }
`