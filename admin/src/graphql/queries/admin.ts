import { gql } from '@apollo/client/core'
import { ADMIN_FRAGMENT } from '../fragments'

export const ME_QUERY = gql`
    ${ ADMIN_FRAGMENT }
    query ME {
        me {
            ...AdminFragment
        }
    }
`

export const ADMINS_QUERY = gql`
    ${ ADMIN_FRAGMENT }
    query Admins ($owner: ID $query: String $skip: Float $take: Float) {
        adminCount
        managerCount
        me {
            ...AdminFragment
        }
        admins (owner: $owner query: $query skip: $skip take: $take) {
            ...AdminFragment
        }
    }
`

export const ALL_ADMIN_QUERY = gql`
    ${ ADMIN_FRAGMENT }
    query Admins ($query: String $skip: Float $take: Float) {
        allAdmin (query: $query skip: $skip take: $take) {
            ...AdminFragment
        }
    }
`

export const REGISTRATION_COUNT_QUERY = gql`
    query RegistrationCount ($hours: Float) {
        registrationCount (hours: $hours)
    }
`