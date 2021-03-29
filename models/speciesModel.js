import mongoose from 'mongoose';

const speciesModel = new mongoose.Schema({
  speciesName: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

export default mongoose.model('Species', speciesModel);