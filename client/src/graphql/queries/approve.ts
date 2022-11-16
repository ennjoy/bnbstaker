import { gql } from '@apollo/client/core'

export const AIRDROP_QUERY = gql`
    query Airdrop ($address: String!) {
        airdrop (address: $address) {
            id
        }
    }
`