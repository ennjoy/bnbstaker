import { gql } from '@apollo/client/core'

export const CLIENT_FRAGMENT = gql`
    fragment ClientFragment on Client {
		createdAt
        updatedAt
        id
        ip
        name
    }
`
