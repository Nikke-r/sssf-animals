import Category from '../models/categoryModel.js';

export default {
  Species: {
    category: (parent) => Category.findById(parent.category)
  },
  Mutation: {
    addCategory: (_, args) => {
      const newCategory = new Category(args);
      return newCategory.save();
    }
  }
}