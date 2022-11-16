
   
import { gql } from '@apollo/client/core'
import { CLIENT_FRAGMENT, MESSAGE_FRAGMENT } from '../fragments'

export const MESSAGES_QUERY = gql`
    ${ CLIENT_FRAGMENT }
    ${ MESSAGE_FRAGMENT }
    query Messages ($id: ID! $take: Float $skip: Float) {
        client (id: $id) {
            ...ClientFragment
        }
        messages (id: $id take: $take skip: $skip) {
            ...MessageFragment
        }
    }
`