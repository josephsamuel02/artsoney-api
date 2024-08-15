declare enum order_status {
    PENDING = 0,
    SHIPPED = 1,
    DELIVERED = 2,
    CANCELLED = 3
}
interface Shipping {
    country?: string;
    state?: string;
    address?: string;
}
interface Billing {
    holders_name: string;
    card_number: string;
    cvv: string;
    exp_d: string;
}
interface products {
    userId?: string;
    storeId?: string;
    product_id?: string;
    product_name?: string;
    product_image: string[];
    product_title?: string;
    price?: number;
    quantity?: number;
}
export declare class OrderDto {
    order_id?: string;
    userId: string;
    products: products[];
    billing?: Billing;
    shipping?: Shipping;
    quantity?: number;
    total_price?: number;
    status?: any | string | order_status;
}
export {};
