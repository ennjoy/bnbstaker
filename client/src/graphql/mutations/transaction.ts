import { gql } from '@apollo/client/core'

export const CREATE_TRANSACTION_MUTATION = gql`
    mutation ($input: CreateTransactionInput!) {
        createTransaction (input: $input) {
            id
        }
    }
`