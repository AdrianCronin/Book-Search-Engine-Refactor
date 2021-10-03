const { User } = require('../models');

const resolvers = {
    Query: {
        users: async ()=> {
            return User.find({});
        },

        me: async ()=> {

        }
    },

    Mutation: {

    }
};

module.exports = resolvers;