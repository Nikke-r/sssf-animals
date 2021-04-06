import Species from '../models/speciesModel.js';

export default {
  Animal: {
    species: (parent) => Species.findById(parent.species)
  },
  Mutation: {
    addSpecies: (_, args, context) => {
      const { user } = context;

      if (!user) throw new AuthenticationError('Not authenticated!');
      
      const newSpecies = new Species(args);
      return newSpecies.save();
    }
  }
}