interface Following {
    user_name: string;
    userId: string;
}
interface Followers {
    user_name: string;
    userId: string;
}
interface Socials {
    facebook?: string;
    x_social?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    patreon?: string;
}
interface Address {
    country: string;
    street: string;
    city?: string;
    state: string;
    zip?: string;
    ip_address?: string;
}
export declare class UpdateUserDto {
    userId: string;
    email?: string;
    phone_number?: string;
    user_name?: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: Date;
    address?: Address;
    profile_img?: string;
    profile_poster_img?: string;
    about?: string;
    art_focus?: string;
    bio?: string;
    website: string[];
    socials?: Socials;
    country?: string;
    state?: string;
    time_zone?: string;
    language?: string;
    profession?: string[];
    following?: Following;
    followers?: Followers;
    likes?: number;
    interests?: string[];
    hubby?: string[];
    Post?: object;
    moodboard?: object;
    isActive?: boolean;
    suspended?: boolean;
    authStrategy?: string;
    Store?: object;
}
export {};
