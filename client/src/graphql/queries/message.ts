import { gql } from '@apollo/client/core'
import { MESSAGE_FRAGMENT } from '../fragments'

export const MESSAGES_QUERY = gql`
    ${ MESSAGE_FRAGMENT }
    query Messages ($take: Float $skip: Float) {
        messages (take: $take skip: $skip) {
            ...MessageFragment
        }
    }
`