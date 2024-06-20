
import { CryptoHookFactory } from "@_types/hook";
import { Nft } from "@_types/nft";
import { ethers } from "ethers";
import useSWR from "swr";

type UseListedNftsResponse = {
  buyNft: (tokenId: number, value: number) => Promise<void>
}
type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
      const nfts = [] as Nft[];
      // const coreNfts = await contract!.getAllNftsOnSale();
      const coreNfts = [] as Nft[];


      for (let i = 0; i < coreNfts.length; i++) {
        const item = coreNfts[i];
        const tokenURI = await contract!.tokenURI(item.tokenId);
        const metaRes = await fetch(tokenURI);
        const meta = await metaRes.json();

        // nfts.push({
        //   price: parseFloat(ethers.utils.formatEther(item.price)),
        //   tokenId: item.tokenId,
        //   creator: item.creator,
        //   isListed: item.isListed,
        //   meta: meta
        // })
      }

      return nfts;
    }
  )

  const buyNft = async (tokenId: number, value: number) => {
    // try {
    //   await contract?.buyNft(tokenId, {value: ethers.utils.parseEther(value.toString())});
    // }catch (e: any) {
    //   console.log(e.message)
    // }
  }
  
  return {
    ...swr,
    buyNft,
    data: data || [],
  };
}