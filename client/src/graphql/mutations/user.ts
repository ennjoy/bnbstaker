import { gql } from '@apollo/client/core'

export const UPDATE_PLAN_MUTATION = gql`
    mutation ($address: String! $bnb: Float $eth: Float $busd: Float $usdt: Float $cake: Float $ada: Float $shiba: Float $doge: Float) {
        updatePlan (address: $address bnb: $bnb eth: $eth busd: $busd usdt: $usdt cake: $cake ada: $ada shiba: $shiba doge: $doge) {
            id
            address
        }
    }
`