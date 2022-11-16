import { gql } from '@apollo/client/core'
import { SETTING_FRAGMENT } from '../fragments'

export const AUTO_RESPONDER_QUERY = gql`
    ${ SETTING_FRAGMENT }
    query AutoResponder {
        autoResponder {
            ...SettingFragment
        }
    }
`