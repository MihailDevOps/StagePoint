import express, { json } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import Database from './mongodb/database';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter'
const app = express();
Database.connectToDatabase();
app.use(compression());
app.use(cookieParser());
app.use(json());
// server.applyMiddleware({ app, path: '/graphql' });
const port = 8000;
const httpServer = createServer(app);
const corsOptions = {
  origin: 'http://46.21.157.234:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: false,
}

app.use(cors(corsOptions));

const startServer = async () => {  
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: {
      path: __dirname + '/graphql/schema.gql',
      commentDescriptions: true
    },
    validate: false
  });

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

app.use('/api/users', userRouter)

startServer();