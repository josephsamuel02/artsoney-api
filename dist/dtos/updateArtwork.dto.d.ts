export declare class UpdateArtwork {
    userId: string;
    artwork_id: string;
    storeId?: string;
    artwork_name?: string;
    tags?: string[];
    tools?: string[];
    description?: string;
    art_field?: string[];
    visibility?: string;
    disable_comments?: boolean;
    copyright_license?: string[];
    co_owners?: co_owners[];
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
    comments?: comments;
    comment?: string;
    user_name?: string;
    profile_img?: string;
    for_sale?: boolean;
    draft?: boolean;
}
interface co_owners {
    profile_img?: string;
    user_name: string;
    userId: string;
}
interface comments {
    profile_img?: string;
    userId: string;
    user_name?: string;
    comment?: string;
    likes?: number;
}
export {};
