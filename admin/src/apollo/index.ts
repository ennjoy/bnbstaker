import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useLogout } from '~/hooks/useLogout'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${ token }` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {

  if (graphQLErrors) {
    for (let error of graphQLErrors) {      
      
      switch (error.extensions.code) {

        case 'UNAUTHENTICATED':

          // // Modify the operation context with a new token
          // const oldHeaders = operation.getContext().headers
          // operation.setContext({
          //   headers: {
          //     ...oldHeaders,
          //     authorization: getNewToken(),
          //   },
          // })
          // return forward(operation)

          return useLogout()
      }
      
      console.log(`[GraphQL error]: Message: ${ error.message }, Location: ${ error.locations }, Path: ${ error.path }`)

    }
  }

  if (networkError) {
    console.log(`[Network error]: ${ networkError }`)
  }
})

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  // import.meta.env.PROD
  uri: true ? 'https://graphql.bepstaker.org/graphql' : 'http://localhost:8001/graphql'
})

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
})

export default client