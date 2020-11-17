import { InMemoryCache } from 'apollo-cache-inmemory'

// Cache implementation
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      animal: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Animal', id: args.id }),
    },
  },
})
export default () => ({
  httpEndpoint:
    process.env['GRAPHQL_URL'] || 'https://william-will.tech/graphql',
  cache,
})
