import { gql } from '@apollo/client/core'

export const AVAILABLE_FRAGMENT = gql`
    fragment AvailableFragment on Available {
        invested {
            bnb
            eth
            busd
            usdt
            cake
            ada
            shiba
            doge
        }
        withdrawn {
            bnb
            eth
            busd
            usdt
            cake
            ada
            shiba
            doge
        }
    }
`