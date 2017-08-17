import {
  makeExecutableSchema,
  // addMockFunctionsToSchema,
} from 'graphql-tools';

import resolvers from './resolvers';
// import mocks from './mocks';

const typeDefs = `
type Pollster {
  name: String
  weight: Int
  polls: [Poll]
}

type Poll {
  type: String
  date: String
  value: Int
  pollster: Pollster
  
}
type Query {
  pollster(name: String): Pollster
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, resolvers });

export default schema;
