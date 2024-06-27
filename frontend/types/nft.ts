export type Trait = 'attack' | "health" | "speed";

export type NftAttribute = {
    trait_type: Trait;
    value: string;
};

export type NftType = {
    name: string;
    description: string;
    image: string;
    attributes?: NftAttribute[];
    rangeStart: number;
    rangeEnd: number;
    slug?: string;
}

export type NftMeta = {
    name: string;
    description: string;
    image: string;
    attributes: NftAttribute[];
};

export type NftCore = {
    tokenId: number;
    price: number;
    creator: string;
    startDate: Date;
    endDate: Date;
    depositTerm: number;
    depositInterest: number;
    interest: "monthly" | "compound";
    rewardsClaimed: number;
    payOff: number;
    isListed: boolean;
    rewardsAvailable: number;
    rewardProfit: number;
    network?: string;
    chain?: number;
};

export type Nft = {
    meta: NftMeta
} & NftCore;