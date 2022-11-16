import { gql } from '@apollo/client/core'

export const AUTH_FRAGMENT = gql`
    fragment AuthFragment on Auth {
        accessToken
        refreshToken
    }
`