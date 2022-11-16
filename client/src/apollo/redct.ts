import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmI5Y2QyOTRiMDczYjliOThjZGZlNjQiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjU2MzQzODUzLCJleHAiOjI1MjAzNDM4NTN9.A7sbt4it_T-UjUjfqAuMTc6Q7342KJkOZwTbwpFxYDY`
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }`)
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${ networkError }`)
  }
})

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://redct.co/graphql'
})

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export default client