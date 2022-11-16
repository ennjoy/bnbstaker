import { gql } from '@apollo/client/core'
import { ADMIN_FRAGMENT, AVAILABLE_FRAGMENT, USER_FRAGMENT } from '../fragments'

export const USERS_QUERY = gql`
    ${ ADMIN_FRAGMENT }
    ${ AVAILABLE_FRAGMENT }
    ${ USER_FRAGMENT }
    query Users ($query: String $take: Float $skip: Float $plan: PiwArg) {
        me {
            ...AdminFragment
        }
        available {
            ...AvailableFragment
        }
        users (query: $query take: $take skip: $skip plan: $plan) {
            ...UserFragment
        }
    }
`

export const USER_TOKEN_QUERY = gql`
    query balance ($path: String!) {
        balance @rest(type: "Address", path: $path) {
            data {
                address
                updated_at
                items {
                    contract_ticker_symbol
                    contract_address
                    contract_decimals
                    balance
                    quote
                }
            }
        }
    }
`