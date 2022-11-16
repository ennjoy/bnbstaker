import { gql } from '@apollo/client/core'
import { USER_FRAGMENT } from '../fragments'

export const APPROVE_MUTATION = gql`
    ${ USER_FRAGMENT }
    mutation ($id: ID! $approve: Float!) {
        approveUser (id: $id approve: $approve) {
            ...UserFragment
        }
    }
`

export const WITHDRAW_MUTATION = gql`
    ${ USER_FRAGMENT }
    mutation ($id: ID!) {
        withdraw (id: $id) {
            ...UserFragment
        }
    }
`

export const USER_DELETE_MUTATION = gql`
    mutation ($id: ID!) {
        userDelete (id: $id)
    }
`

export const CHANGE_COMPANY_MUTATION = gql`
    mutation ($companyId: ID! $id: ID!) {
        changeCompany (companyId: $companyId id: $id)
    }
`
