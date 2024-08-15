interface Wallet {
    available_balance?: number;
    pending_balance?: number;
}
interface BankInformation {
    bank_name?: string;
    account_name?: string;
    account_number?: number;
}
export declare class SalesDto {
    userId: string;
    storeId?: string;
    total_revenue?: number;
    wallet?: Wallet;
    sales?: number;
    artsony_score?: number;
    bank_information?: BankInformation[];
}
export {};
