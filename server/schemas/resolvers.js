const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findeOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('No user found with the given email/password');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('No user found with the given email/password')
            }

            const token = signToken(user);

            return {token, user};
        },

        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user };
        },
        
        saveBook: async (parent, {bookId, authors, title, description, image}, context) => {
            // if (context.user) {
            //     const book = "",
            // }
        },

        removeBook: async () => {

        },
    }
};

module.exports = resolvers;