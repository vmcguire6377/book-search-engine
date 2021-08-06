const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id})
      
      .select('-__v -password')
      return userData;
    }
    throw new AuthenticationError('This user not logged in.');
  },

  users: async () => {
    return User.find().select("-__v -password");
  },

  user: async (parent, {username}) => {
    return User.findOne({ username }).select("-__v -password");
  },
  userById: async (parent, { _id}) => {
    return User.findOne({ _id }).select("-__v -password");
  },
  },
  Mutation: {
    login: async (parent, {email}, {password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('That user does not exist.');
      }
      const authPassword = await user.isCorrectPassword(password);

      if (!authPassword) {
        throw new AuthenticationError('Incorrect credentials.');
      }
        const token = signToken(user)
        return {token, User};
      },

      saveBook: async (parent, { input }, { user }) => {
        if (user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: user._id },
            { $addToSet: { savedBooks: input } },
            { new: true, runValidators: true}
          );
          return updatedUser;
        }
        throw new AuthenticationError("Login is required.");
      },
      removeBook: async (parent, {bookId}, {user}) => {
        if (user) {
          const modifiedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true, runValidators: true }
          );
          return modifiedUser;
        }
        throw new AuthenticationError("Login is required.");
      }
    }
};


module.exports = resolvers;