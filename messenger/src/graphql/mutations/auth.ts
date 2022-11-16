import { gql } from '@apollo/client/core'
import { AUTH_FRAGMENT } from '../fragments'

export const LOGIN_MUTATION = gql`
    ${ AUTH_FRAGMENT }
    mutation ($input: LoginInput!) {
        login(input: $input) {
            ...AuthFragment
        }
    }
`
export const SIGNUP_MUTATION = gql`
    ${ AUTH_FRAGMENT }
    mutation ($input: SignupInput!) {
        signup(input: $input) {
            ...AuthFragment
        }
    }
`