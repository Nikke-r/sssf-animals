import mongoose from 'mongoose';

const animalModel = new mongoose.Schema({
  animalName: String,
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
  },
});

export default mongoose.model('Animal', animalModel);