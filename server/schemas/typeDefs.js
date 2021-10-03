const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        
    }

`;

module.exports = typeDefs;