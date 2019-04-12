# Zero to Server with GraphQL

This repository is the starting place for a mob-programing session with the goal to create a GraphQL server.

We'll start with quick comparison about what it really means to create a REST api and what types of problems GraphQL can address.

Then we'll dive into a clean project and build up a GraphQL server using [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started) in NodeJS. We'll work together to create a basic schema, and write our first resolvers. We'll continue by finding a way to organize our files, learn what context is and how to use it. If time allows we'll also talk about cacheing data with [`dataloader`](https://github.com/graphql/dataloader). We'll also provide links with and some thoughts on how to implment Authorization.

This will be a slide-free, code heavy, mob programming session, so bring your laptops, and let's play with GraphQL together.

## Doing REST, right.

I first learned about [Richardson Maturity Model
](https://martinfowler.com/articles/richardsonMaturityModel.html) in David Zuelke's 2012 ["Designing HTTP Interfaces And RESTful Web Services"](https://www.youtube.com/watch?v=XzgCzjMdvRE) talk. If you are creating REST api's it's a must watch in my opinion.

## GraphQL Resources

- [How To GraphQL](https://www.howtographql.com/)
- Shopify's [GraphQL Design Tutorial](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md) is a great read on how to make a good GraphQL Schema
- Authorization resources:
  - [GraphQL.org's Authorization](https://graphql.org/learn/authorization/) docs
  - [Apollo's Authorization][https://blog.apollographql.com/authorization-in-graphql-452b1c402a9] post
  - [`graphql-shield`](https://github.com/maticzav/graphql-shield)
