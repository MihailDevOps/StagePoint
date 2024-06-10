import express, { json } from 'express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import "reflect-metadata";
import cookieParser from 'cookie-parser';
import formidable  from 'express-formidable';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

import userRouter from './routes/userRouter';
import adminRouter from './routes/adminRouter';
import supportRouter from './routes/supportRouter';
import dbInit from './db/init';
import { verifyToken } from './middleware/jwtMiddleware';
import planRouter from './routes/planRouter';
import { default as Moralis } from "moralis"
import Chains from "@moralisweb3/common-evm-utils";
const EvmChain = Chains.EvmChain;
const ABI = require("../contract/SPFNft.json");
dotenv.config();


const options = {
  chains: [EvmChain.SEPOLIA],
  description: "USDC Transfers 100k",
  tag: "usdcTransfers100k",
  includeContractLogs: true,
  webhookUrl: "http://38.180.4.128:8000//blockchain-webhook"
};

Moralis.start({
  apiKey: process.env.MORALIS_KEY ,
}).then(async () => {
  const stream = await Moralis.Streams.add(options);
  const { id } = stream.toJSON();
  await Moralis.Streams.addAddress({
      id: id,
      address: ["0x8a6E9a8E0bB561f8cdAb1619ECc4585aaF126D73"]
  })
});

const app = express();
app.use(compression());

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(formidable())
const port = 8000;
app.use
const httpServer = createServer(app);
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  credentials: true,
}

app.use(cors(corsOptions));

const startServer = async () => {
  dbInit()
  httpServer.listen({ port }, () => { console.log(`🚀 Server ready at ${port} port`) })
}

app.use('/api/support', verifyToken, formidable() , supportRouter)
app.use('/user', userRouter)
app.use('/plan', planRouter)
app.use('/admin', adminRouter)
app.post('/blockchain-webhook', (req, res) => {
  console.log(req.body);
  res.status(200).end();
})
startServer();