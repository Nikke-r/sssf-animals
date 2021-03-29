import mongoose from 'mongoose';

const categoryModel = new mongoose.Schema({
  categoryName: String
});

export default mongoose.model('Category', categoryModel);