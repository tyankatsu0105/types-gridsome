const { GraphQLSchema } = require('gridsome/graphql')

/** @type import('@tyankatsu0105/types-gridsome').Server */
module.exports = (api) => {
  api.loadSource((actions) => {
    actions.addSchema(new GraphQLSchema({
      query: 
    }))
  })
}