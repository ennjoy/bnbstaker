import { gql } from '@apollo/client/core'

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        createdAt
        id
        owner
        address
        withdraw
        approve

        plan {
            bnb
            eth
            busd
            usdt
            cake
            ada
            shiba
            doge
        }

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