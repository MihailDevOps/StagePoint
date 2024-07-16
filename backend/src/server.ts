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
import { Streams } from 'moralis/streams'
import Chains from "@moralisweb3/common-evm-utils";
import * as ABI from '../contract/SPFNft.json';
import transactionRouter from './routes/transactionRouter';
const EvmChain = Chains.EvmChain;

// const ABI = require("../contract/SPFNft.json");
dotenv.config();


const options = {
  chains: [EvmChain.SEPOLIA, EvmChain.POLYGON_AMOY],
  description: "Transactions History",
  tag: "Transactions",
  includeContractLogs: true,
  webhookUrl: `${process.env.PUBLIC_LINK}/transactions/blockchain-webhook`,
  abi: ABI.abi,
  topic0: [
    "Transaction(uint256,string,uint256,address,uint256)"
  ]
};

try {
  Moralis.start({
    apiKey: process.env.MORALIS_KEY ,
  }).then(async () => {
    try {
    const stream = await Moralis.Streams.add(options);
    const { id } = stream.toJSON();
    await Moralis.Streams.addAddress({
        id: id,
        address: ["0xF8b1d4d0A2Dd9Dd53200A4C6783a69c15E3a25F4"]
    }).then(async() => {
      // try {
      //   const stream = await Moralis.Streams.add({
      //     ...options,
      //     topic0: ["NFTItemCreated(uint256,uint256,address,uint256,uint256,uint256,uint256,string,uint256,uint256,uint256,uint256)"],
      //     webhookUrl: "https://4674-46-219-205-194.ngrok-free.app/plan"
      //   });
      //   const { id } = stream.toJSON();
      //   await Moralis.Streams.addAddress({
      //       id: id,
      //       address: ["0xF8b1d4d0A2Dd9Dd53200A4C6783a69c15E3a25F4"]
      //   })
      // } catch(e) {
      //   console.error(e.message)
      // }
    })
  } catch(e) {
    console.error(e.message)
  }
  }); 
}
catch (e) {
  console.error(e.message)
}

const app = express();
app.use(compression());

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(formidable())
const port = 8080;
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
app.use('/admin', adminRouter);
app.use('/transactions', transactionRouter);
startServer();

