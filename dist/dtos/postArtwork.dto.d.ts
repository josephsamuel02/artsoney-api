export declare class PostArtworkDto {
    userId: string;
    storeId: string;
    artwork_name: string;
    tags?: string[];
    tools?: string[];
    description?: string;
    art_field?: string[];
    visibility?: string;
    disable_comments?: boolean;
    copyright_license?: any;
    co_owners?: any;
    designed_for?: string[];
    appreciation?: string[];
    dimensions?: object;
    images?: string[];
    thumbnail?: string;
    embed_code?: string[];
    audio_video?: string[];
    animated_3d?: string[];
    certificate_of_authentication_type?: any;
    certificate_of_authentication?: string[];
    available_quantity?: number;
    currency?: any;
    auction?: boolean;
    price?: number;
    likes?: number;
    views?: number;
    comments?: object;
    for_sale?: boolean;
    draft?: boolean;
}