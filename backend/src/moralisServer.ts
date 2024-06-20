import { default as Moralis } from "moralis"
import Chains from "@moralisweb3/common-evm-utils";
import dotenv from 'dotenv';

const EvmChain = Chains.EvmChain;
const ABI = require("./contract/SPFNft.json");
dotenv.config();


const options = {
  chains: [EvmChain.SEPOLIA],
  description: "USDC Transfers 100k",
  tag: "usdcTransfers100k",
  includeContractLogs: true,
  abi: ABI,
  webhookUrl: "http://localhost:8000/blockcjain-webhook"
};

Moralis.start({
  apiKey: process.env.MORALIS_KEY ,
}).then(async () => {
  const stream = await Moralis.Streams.add(options);
  const { id } = stream.toJSON();
  await Moralis.Streams.addAddress({
      id: id,
      address: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]
  })
});