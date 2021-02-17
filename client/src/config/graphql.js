import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_FAVORITES } from '../queries/favorites'
const baseURL = "http://localhost:4000"

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache()
})

client.writeQuery({
  query: GET_FAVORITES,
  data: {
    favorites: []
  }
})

export default client