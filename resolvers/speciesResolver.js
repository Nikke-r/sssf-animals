import Species from '../models/speciesModel.js';

export default {
  Animal: {
    species: (parent) => Species.findById(parent.species)
  },
  Mutation: {
    addSpecies: (_, args) => {
      const newSpecies = new Species(args);
      return newSpecies.save();
    }
  }
}