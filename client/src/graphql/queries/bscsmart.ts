import { gql } from '@apollo/client/core'

export const BSCSMART_CURRENCY_QUERY = gql`
    query Currency ($ids: [String!]) {
        currency (ids: $ids) {
            currency
            price
            change
        }
    }
`