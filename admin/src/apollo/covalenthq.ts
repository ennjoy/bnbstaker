import { ApolloClient, InMemoryCache, from } from '@apollo/client/core'
import { RestLink } from 'apollo-link-rest'

// HTTP connection to the API
const restLink = new RestLink({
    // You should use an absolute URL here
    uri: 'https://api.covalenthq.com/v1/56/',
})

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([restLink]),
  cache: new InMemoryCache()
})

export default client