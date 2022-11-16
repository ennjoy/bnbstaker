import { gql } from '@apollo/client/core'
import { MESSAGE_FRAGMENT } from '../fragments'

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    ${ MESSAGE_FRAGMENT }
    subscription MessageAdded ($id: ID) {
        messageAdded (id: $id) {
            ...MessageFragment
        }
    }
`

export const MESSAGE_NOTIFY_SUBSCRIPTION = gql`
    ${ MESSAGE_FRAGMENT }
    subscription MessageNotify {
        messageNotify {
            ...MessageFragment
        }
    }
`