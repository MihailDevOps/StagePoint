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
import { ContractInfo } from './db/models';

var cron = require('node-cron');
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
    "Transaction(uint256,string,uint256,address,uint256)",
    "NFTItemCreated(uint256,uint256,address,uint256,uint256,uint256,uint256,string,uint256,uint256,uint256,uint256)"
  ]
};

try {
  Moralis.start({
    apiKey: process.env.MORALIS_KEY ,
  }).then(async () => {
    try {
      const response = await Moralis.Streams.getAll({limit: 1});
      if (!response.result[0]?.webhookUrl || response.result[0].webhookUrl !== `${process.env.PUBLIC_LINK}/transactions/blockchain-webhook`) {
        const stream = await Moralis.Streams.add(options);
        const { id } = stream.toJSON();
        await Moralis.Streams.addAddress({
            id: id,
            address: ["0x1bA8781Ca57ce21Be27a0aE424097daC91C19175"]
        });
      } 
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

cron.schedule('30 2 * * *', async () => {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      "chain": "0x13882",
      "address": "0x1bA8781Ca57ce21Be27a0aE424097daC91C19175"
    });
    const decimals = Math.pow(10, 18);
    const balance = response.toJSON()[0]?.balance as unknown as number / decimals;
    if (balance) {
      await ContractInfo.create({ balance })
    }
  } catch (e: any) {
    console.log(`Cron Job error: ${e.message}`)
  }
});

startServer();
