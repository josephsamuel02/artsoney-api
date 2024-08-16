interface Wallet {
    available_balance?: number;
    pending_balance?: number;
}
interface BankInformation {
    bank_name?: string;
    account_name?: string;
    account_number?: string;
}
interface Reviews {
    user_name?: string;
    user_id: string;
    profile_image?: string;
    rating?: number;
    review?: string;
}
interface Rating {
    artsony_score?: number;
    art_rating?: number;
    customer_satisfaction?: number;
    delivery_rating?: number;
    reviews?: Reviews[];
}
export declare class SalesDto {
    userId: string;
    storeId?: string;
    total_revenue?: number;
    wallet?: Wallet;
    sales?: number;
    rating?: Rating;
    bank_information?: BankInformation[];
}
export {};
