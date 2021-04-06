import { AuthenticationError } from 'apollo-server-errors';
import Category from '../models/categoryModel.js';

export default {
  Species: {
    category: (parent) => Category.findById(parent.category)
  },
  Mutation: {
    addCategory: (_, args, context) => {
      const { user } = context;

      if (!user) throw new AuthenticationError('Not authenticated!');

      const newCategory = new Category(args);
      return newCategory.save();
    }
  }
}