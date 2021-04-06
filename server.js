import 'dotenv/config.js';
import { ApolloServer } from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import connectMongo from './db.js';
import { checkAuth } from './passport/authenticate.js';

(async () => {
   try {
    await connectMongo();

    const server = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        context: async ({req, res}) => {
            try {
                if (req) {
                    const user = await checkAuth(req, res);

                    return {
                        req,
                        res,
                        user
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    });
  
    const app = express();

    server.applyMiddleware({ app });

    app.listen({port: 3000}, () =>
        console.log(
            `🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
    );
   } catch (e) {
      console.log('server error: ' + e.message);
   }
})();
