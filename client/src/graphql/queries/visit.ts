import { gql } from '@apollo/client/core'

export const VISIT_QUERY = gql`
    query Visit {
        visit {
            id
            ip
        }
    }
`