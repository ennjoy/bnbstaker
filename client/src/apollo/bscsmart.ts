import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // localStorage.removeItem('accessToken')
      // localStorage.removeItem('refreshToken')
      // router.push({ name: 'Index' })
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://bscsmart.tech/graphql'
})

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export default client