import express, { json } from 'express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import "reflect-metadata";
import cookieParser from 'cookie-parser';
import supportRouter from './routes/supportRouter';
import formidable  from 'express-formidable';
import bodyParser from 'body-parser';
const app = express();
app.use(compression());

app.use(cookieParser());
app.use(json());
app.use(formidable())
const port = 8000;
app.use
const httpServer = createServer(app);
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
}

app.use(cors(corsOptions));

const startServer = async () => {  
  httpServer.listen({ port }, () => { console.log(`🚀 Server ready at http://localhost:${port}/`) })
}


app.use('/api/support', supportRouter)
startServer();