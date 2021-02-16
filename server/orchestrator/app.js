const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server")
const movieSchema = require("./schemas/movie")
const seriesSchema = require("./schemas/series")

const typeDefs = gql`
  type Query
  type Mutation
`
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, seriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, seriesSchema.resolvers],
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`Apollo Server ready at ${url}`)
})