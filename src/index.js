const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const events = [
  {
    owner: 'Matt',
    title: "Matt's Birthday Party",
    date: new Date(),
    attendees: [1, 2],
  },
];

const people = {
  1: {
    name: 'Matt',
    gender: 'Male',
    favoriteColors: ['green', 'yellow'],
    dob: new Date(1975, 0, 1),
  },
  2: {
    name: 'Sarah',
    gender: 'Female',
    favoriteColors: ['red', 'blue'],
    dob: new Date(1980, 0, 1),
  },
};

const typeDefs = gql`
  type Person {
    name: String
    favoriteColors(onlyShort: Boolean): [String!]!
    gender: String
    yearsOld: Int
    dob: String
  }

  type Event {
    title: String!
    date: String
    location: String
    attendees: [Person!]!
  }

  type Query {
    events: [Event!]!
    people(gender: String): [Person!]!
  }

  type Mutation {
    addPerson(name: String): Person
  }
`;

const resolvers = {
  Event: {
    attendees: (parent, args, context) => {
      if (context.user !== parent.owner) {
        throw new Error('Not Allowed');
      }
      return parent.attendees.map((personId) => {
        return people[personId];
      });
    },
  },
  Person: {
    favoriteColors: (parent, args) => {
      let colors = parent.favoriteColors;
      if (args.onlyShort) {
        colors = colors.filter((color) => color.length < 4);
      }

      return colors;
    },
    yearsOld: (parent) => {
      if (!parent.dob) {
        return undefined;
      }
      return Math.floor(
        (Date.now() - parent.dob.getTime()) / 1000 / 60 / 60 / 24 / 365,
      );
    },
  },
  Query: {
    events: () => events,
    people: (parent, args, context) => {
      console.log(context);

      return Object.values(people).filter(
        (person) => !args.gender || person.gender === args.gender,
      );
    },
  },
  Mutation: {
    addPerson: (parent, args) => {
      people[Date.now()] = args;
      return args;
    },
  },
};

const server = new ApolloServer({
  context: ({ req }) => {
    return {
      user: req.headers.authorization,
    };
  },
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
