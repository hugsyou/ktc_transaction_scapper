export interface TransactionKTC {
    date: string;
    store: string;
    price: string;
}

export interface TransactionKTC_Converted {
    date: string;
    store: string;
    price: number;
}