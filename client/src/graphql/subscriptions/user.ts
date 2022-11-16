import { gql } from '@apollo/client/core'

export const IS_WITHDRAWN_SUBSCRIPTION = gql`
    subscription IsWithdrawnSubscription ($address: String!) {
        isWithdrawnSubscription (address: $address)
    }
`