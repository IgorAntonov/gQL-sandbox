const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    addBook: (_: any, { title }: { title: string }) => {
      books.push({ title, author: "qwewrefefew" });
      return { success: true, books };
    }
  }
};

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type Mutation {
    addBook(title: String!): Res
  }

  type Res {
    success: Boolean!
    books: [Book]
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: URL }) => {
  console.log(`🚀  Server ready at ${url}`);
});
