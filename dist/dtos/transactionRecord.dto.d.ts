interface BuyerInformation {
    userId: string;
    user_name?: string;
    profile_image?: string;
    buyer_account_name?: string;
}
interface SellerInformation {
    userId: string;
    user_name?: string;
    profile_image?: string;
    seller_account_name?: string;
}
interface Product {
    product_id: string;
    product_name: string;
    product_image: string;
    product_price: number;
    quantity: number;
}
declare enum TransactionStatus {
    PENDING = "PENDING",
    FAILED = "FAILED",
    SUCCESSFUL = "SUCCESSFUL"
}
declare enum TransactionType {
    PAYMENT = "PAYMENT",
    WITHDRAWAL = "WITHDRAWAL",
    FUND_WALLET = "FUND_WALLET"
}
export declare class TransactionsRecordDto {
    transaction_id?: string;
    userId?: string;
    buyer_information?: BuyerInformation;
    seller_information?: SellerInformation;
    products: Product;
    transaction_total_price?: number;
    from?: string;
    transaction_status?: TransactionStatus;
    transaction_type: TransactionType;
    transaction_image?: string;
    remark?: string;
}
export {};
