import { UserInputError } from 'apollo-server-errors';
import Animal from '../models/animalModel.js';

export default {
  Query: {
    animals: () => Animal.find({})
  },
  Mutation: {
    addAnimal: (_, args) => {
      const newAnimal = new Animal(args);
      return newAnimal.save();
    },
    modifyAnimal: async (_, args) => {
      try {
        const { id, animalName, species } = args;
        const updatedAnimal = await Animal.findByIdAndUpdate(id, { animalName, species }, { new: true });
        return updatedAnimal.save();
      } catch (error) {
        throw new UserInputError(`Error while updating the animal: ${error.message}`);
      }
    }
  }
};
