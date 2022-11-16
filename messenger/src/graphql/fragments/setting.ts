import { gql } from '@apollo/client/core'

export const SETTING_FRAGMENT = gql`
    fragment SettingFragment on Setting {
        id
        active
        value
    }
`