import { gql } from '@apollo/client/core'

export const SHORTEN_MUTATION = gql`
    mutation Shorten ($input: ShortenInput!) {
        shorten (input: $input) {
            id
            url
        }
    }
`
