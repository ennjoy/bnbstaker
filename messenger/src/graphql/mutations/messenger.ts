import { gql } from '@apollo/client/core'
import { SETTING_FRAGMENT } from '../fragments'

export const CREATE_AUTO_RESPONDER_MUTATION = gql`
    ${ SETTING_FRAGMENT }
    mutation ($value: String!) {
        createAutoResponder(value: $value) {
            ...SettingFragment
        }
    }
`

export const CHANGE_ACTIVE_AUTO_RESPONDER_MUTATION = gql`
    ${ SETTING_FRAGMENT }
    mutation {
        changeActiveAutoResponder {
            ...SettingFragment
        }
    }
`