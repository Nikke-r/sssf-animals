import animalSchema from './animalSchema.js';
import speciesSchema from './speciesSchema.js';
import { gql } from 'apollo-server-express';
import categorySchema from './categorySchema.js';

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;

export default [
  linkSchema,
  animalSchema,
  speciesSchema,
  categorySchema
];
