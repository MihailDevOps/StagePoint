export type Transaction = {
    amount: number;
    type: string;
    date: Date;
    txId: string;
    id: number;
    tokenId?: number;
    user: string;
}