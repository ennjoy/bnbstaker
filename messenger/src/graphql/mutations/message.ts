import { gql } from '@apollo/client/core'
import { MESSAGE_FRAGMENT } from '../fragments'

export const CREATE_MESSAGE_MUTATION = gql`
    ${ MESSAGE_FRAGMENT }
    mutation ($input: CreateMessageInput!) {
        createMessage(input: $input) {
            ...MessageFragment
        }
    }
`

export const DELETE_MESSAGE_MUTATION = gql`
    ${ MESSAGE_FRAGMENT }
    mutation ($id: ID!) {
        deleteMessage(id: $id) {
            ...MessageFragment
        }
    }
`

