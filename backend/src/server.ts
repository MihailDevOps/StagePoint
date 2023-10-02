import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './graphql/schema';
import Database from './mongodb/database';



const app = express();
Database.connectToDatabase();
app.use(compression());
// server.applyMiddleware({ app, path: '/graphql' });
const port = 8000;
const httpServer = createServer(app);
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
}
app.use(cors(corsOptions));
const startServer = async () => {  
  const apollo = new ApolloServer({
        schema,
        introspection: true,
      });
    await apollo.start();
    apollo.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
        origin: ['http://localhost', 'https://studio.apollographql.com'],
        methods: 'GET, POST',
        optionsSuccessStatus: 204,
        credentials: true
      },
  });
  httpServer.listen({ port }, () => { console.log(`🚀 Server ready at http://localhost:${port}/`) })
}
startServer();