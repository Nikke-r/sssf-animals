import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import Animal from '../models/animalModel.js';

export default {
  Query: {
    animals: () => Animal.find({})
  },
  Mutation: {
    addAnimal: (_, args, context) => {
      const { user } = context;

      if (!user) throw new AuthenticationError('Not authenticated!');
      
      const newAnimal = new Animal(args);
      return newAnimal.save();
    },
    modifyAnimal: async (_, args, context) => {
      try {
        const { user } = context;

        if (!user) throw new AuthenticationError('Not authenticated!');

        const { id, animalName, species } = args;
        const updatedAnimal = await Animal.findByIdAndUpdate(id, { animalName, species }, { new: true });
        return updatedAnimal.save();
      } catch (error) {
        throw new UserInputError(`Error while updating the animal: ${error.message}`);
      }
    }
  }
};
