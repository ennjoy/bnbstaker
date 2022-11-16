import { gql } from '@apollo/client/core'

export const MESSAGE_FRAGMENT = gql`
    fragment MessageFragment on Message {
        createdAt
        updatedAt
        id
        content
        senderId
    }
`