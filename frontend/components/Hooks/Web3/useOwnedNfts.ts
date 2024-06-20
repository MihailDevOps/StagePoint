
import { CryptoHookFactory } from "@_types/hook";
import { Nft } from "@_types/nft";
import useSWR from "swr";

type UseOwnedNftsResponse = {}
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useOwnedNfts" : null,
    async () => {
      const nfts = [] as Nft[];
      const coreNfts = await contract!.getOwnedNfts();

      for (let i = 0; i < coreNfts.length; i++) {
        const item = coreNfts[i];
        const tokenURI = await contract!.tokenURI(item.tokenId);
        const metaRes = await fetch(tokenURI);
        const meta = await metaRes.json();

        nfts.push({
          price: item.price.toNumber(),
          tokenId: item.tokenId.toNumber(),
          creator: item.creator,
          startDate: new Date(item.startDate.toNumber()),
          endDate: new Date(item.endDate.toNumber()),
          depositTerm: item.depositTerm.toNumber(),
          depositInterest: item.depositInterest.toNumber(),
          interest: item.interest as "monthly" | "compound",
          isListed: item.isListed,
          rewardsClaimed: item.rewardsClaimed.toNumber(),
          payOff: item.payOff.toNumber(),
          rewardsAvailable: item.rewardsAvailable.toNumber(),
          rewardProfit: item.rewardProfit.toNumber(),
          meta: meta
        })
      }

      return nfts;
    }
  )
  return {
    ...swr,
    data: data || [],
  };
}