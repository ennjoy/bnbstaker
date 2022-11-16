import { gql } from '@apollo/client/core'
import { CLIENT_FRAGMENT, MESSAGE_FRAGMENT } from '../fragments'

export const CLIENTS_QUERY = gql`
    ${ CLIENT_FRAGMENT }
    ${ MESSAGE_FRAGMENT }
    query Clients ($take: Float $skip: Float) {
        clients (take: $take skip: $skip) {
            ...ClientFragment
            messages {
                ...MessageFragment
            }
        }
    }
`