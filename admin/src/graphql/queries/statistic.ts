import { gql } from '@apollo/client/core'
import { USER_FRAGMENT } from '../fragments'

export const STATISTIC_QUERY = gql`
    ${ USER_FRAGMENT }
    query Statistic ($query: String $hours: Float $token: Float $skip: Float $take: Float) {
        visitCount (hours: $hours)
        replenishmentCount (hours: $hours token: $token) {
            count
            sum
        }
        withdrawalsCount (hours: $hours token: $token) {
            count
            sum
        }
        allTransactions (query: $query hours: $hours token: $token skip: $skip take: $take) {
            createdAt
            id
            amount
            status
            token
            plan
            author {
                ...UserFragment
            }
        }
    }
`

export const STATISTIC_PLAN_QUERY = gql`
    query StatisticPlan ($hours: Float $plan: Float $token: Float) {
        planCount (hours: $hours plan: $plan token: $token)
    }
`