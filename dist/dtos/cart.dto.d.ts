export declare class CartDto {
    userId: string;
    user_name?: string;
    product_id?: string;
    product?: CartArtworks;
    products?: CartArtworks[];
    total_price?: number;
    storeId?: string;
}
interface CartArtworks {
    userId?: string;
    storeId?: string;
    product_id?: string;
    product_image?: string[];
    product_title?: string;
    price?: number;
    quantity?: number;
}
export {};
