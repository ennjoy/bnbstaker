import { gql } from '@apollo/client/core'

export const TRANSACTIONS_QUERY = gql`
    query Transactions ($address: String! $token: Float $skip: Float $take: Float) {
        transactions (address: $address token: $token skip: $skip take: $take) {
            createdAt
            id
            amount
            status
            token
            plan
        }
    }
`
