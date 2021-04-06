import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { login } from "../passport/authenticate.js";
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export default {
  Query: {
    login: async (_, args, context) => {
      const {req, res} = context;
      req.body = args;

      try {
        const authResponse = await login(req, res);

        return {
          id: authResponse.user._id,
          username: authResponse.user.username,
          token: authResponse.token
        }
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    }
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const { username, password } = args;

        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        return newUser.save();
      } catch (error) {
        throw new UserInputError(`Error while creating an account: ${error.message}`);
      }
    }
  }
}