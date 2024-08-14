import { HttpException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "src/dtos/updateUser.dto";
import { JwtService } from "@nestjs/jwt";
import { AccountSettingsDto } from "src/dtos/accountSettings.dto";
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getLoggedInUser(req: Request): Promise<HttpException | {
        status: string;
        data: {
            id: string;
            userId: string;
            user_name: string | null;
            email: string | null;
            phone_number: string | null;
            first_name: string | null;
            last_name: string | null;
            middle_name: string | null;
            date_of_birth: Date | null;
            profile_img: string | null;
            profile_poster_img: string | null;
            about: string | null;
            art_focus: string | null;
            bio: string | null;
            website: string[];
            country: string | null;
            state: string | null;
            time_zone: string | null;
            language: string | null;
            profession: string[];
            likes: number | null;
            interests: string[];
            hubby: string[];
            isActive: boolean | null;
            suspended: boolean | null;
            authStrategy: string | null;
            createdAt: Date;
            updatedAt: Date;
            address: {
                country: string;
                street: string;
                city: string | null;
                state: string;
                zip: string | null;
                ip_address: string | null;
            };
            socials: {
                facebook: string | null;
                x_social: string | null;
                instagram: string | null;
                youtube: string | null;
                tiktok: string | null;
                patreon: string | null;
            };
            following: {
                user_name: string;
                userId: string;
            }[];
            followers: {
                user_name: string;
                userId: string;
            }[];
            moodboard: {
                userId: string;
                title: string;
                images: string[];
            };
        };
    }>;
    getUserById(data: string): Promise<{
        status: string;
        data: {
            id: string;
            userId: string;
            user_name: string | null;
            email: string | null;
            phone_number: string | null;
            first_name: string | null;
            last_name: string | null;
            middle_name: string | null;
            date_of_birth: Date | null;
            profile_img: string | null;
            profile_poster_img: string | null;
            about: string | null;
            art_focus: string | null;
            bio: string | null;
            website: string[];
            country: string | null;
            state: string | null;
            time_zone: string | null;
            language: string | null;
            profession: string[];
            likes: number | null;
            interests: string[];
            hubby: string[];
            isActive: boolean | null;
            suspended: boolean | null;
            authStrategy: string | null;
            createdAt: Date;
            updatedAt: Date;
            address: {
                country: string;
                street: string;
                city: string | null;
                state: string;
                zip: string | null;
                ip_address: string | null;
            };
            socials: {
                facebook: string | null;
                x_social: string | null;
                instagram: string | null;
                youtube: string | null;
                tiktok: string | null;
                patreon: string | null;
            };
            following: {
                user_name: string;
                userId: string;
            }[];
            followers: {
                user_name: string;
                userId: string;
            }[];
            moodboard: {
                userId: string;
                title: string;
                images: string[];
            };
        };
    }>;
    getAllUsers(): Promise<{
        status: string;
        data: {
            id: string;
            userId: string;
            user_name: string | null;
            email: string | null;
            phone_number: string | null;
            first_name: string | null;
            last_name: string | null;
            middle_name: string | null;
            date_of_birth: Date | null;
            profile_img: string | null;
            profile_poster_img: string | null;
            about: string | null;
            art_focus: string | null;
            bio: string | null;
            website: string[];
            country: string | null;
            state: string | null;
            time_zone: string | null;
            language: string | null;
            profession: string[];
            likes: number | null;
            interests: string[];
            hubby: string[];
            isActive: boolean | null;
            suspended: boolean | null;
            authStrategy: string | null;
            createdAt: Date;
            updatedAt: Date;
            address: {
                country: string;
                street: string;
                city: string | null;
                state: string;
                zip: string | null;
                ip_address: string | null;
            };
            socials: {
                facebook: string | null;
                x_social: string | null;
                instagram: string | null;
                youtube: string | null;
                tiktok: string | null;
                patreon: string | null;
            };
            following: {
                user_name: string;
                userId: string;
            }[];
            followers: {
                user_name: string;
                userId: string;
            }[];
            moodboard: {
                userId: string;
                title: string;
                images: string[];
            };
        }[];
    }>;
    updateUserById(updateUserDto: UpdateUserDto): Promise<{
        status: string;
        data: {
            id: string;
            userId: string;
            user_name: string | null;
            email: string | null;
            phone_number: string | null;
            first_name: string | null;
            last_name: string | null;
            middle_name: string | null;
            date_of_birth: Date | null;
            profile_img: string | null;
            profile_poster_img: string | null;
            about: string | null;
            art_focus: string | null;
            bio: string | null;
            website: string[];
            country: string | null;
            state: string | null;
            time_zone: string | null;
            language: string | null;
            profession: string[];
            likes: number | null;
            interests: string[];
            hubby: string[];
            isActive: boolean | null;
            suspended: boolean | null;
            authStrategy: string | null;
            createdAt: Date;
            updatedAt: Date;
            address: {
                country: string;
                street: string;
                city: string | null;
                state: string;
                zip: string | null;
                ip_address: string | null;
            };
            socials: {
                facebook: string | null;
                x_social: string | null;
                instagram: string | null;
                youtube: string | null;
                tiktok: string | null;
                patreon: string | null;
            };
            following: {
                user_name: string;
                userId: string;
            }[];
            followers: {
                user_name: string;
                userId: string;
            }[];
            moodboard: {
                userId: string;
                title: string;
                images: string[];
            };
        };
    }>;
    getAccountSettings(accountSettingsDto: AccountSettingsDto): Promise<{
        status: number;
        message: string;
        data: {
            id: string;
            userId: string;
            email: string | null;
            artsony_link: string | null;
            notification: {
                nominate_for_art_of_the_week: boolean | null;
                use_my_artwork_on_artsony: boolean | null;
                use_my_artwork_for_social_media_post: boolean | null;
                like_my_art: boolean | null;
                comment_on_my_art: boolean | null;
                follow_me: boolean | null;
                message_me: boolean | null;
                respond_to_my_message: boolean | null;
                following_post_a_artwork: boolean | null;
                following_message_me: boolean | null;
                following_like_artworks_in_my_moodboard: boolean | null;
                following_post_artwork_for_sale: boolean | null;
                following_respond_to_my_message: boolean | null;
                my_artwork_hit_100_likes: boolean | null;
                my_artwork_hit_500_likes: boolean | null;
                my_artwork_hit_1000_likes: boolean | null;
                my_artwork_hit_10000_likes: boolean | null;
                my_artwork_hit_a_million_likes: boolean | null;
                users_purchase_my_artwork: boolean | null;
                buyers_message_me: boolean | null;
                a_buyer_gives_a_bad_review_on_my_artwork_purchased: boolean | null;
                a_buyer_wants_to_return_an_artwork: boolean | null;
                their_are_pending_orders: boolean | null;
                when_orders_are_activated: boolean | null;
                when_a_buyer_wants_to_return_an_order: boolean | null;
                when_an_order_arrives_damaged: boolean | null;
                can_make_withdrawal_from_my_wallet: boolean | null;
                withdraw_from_my_Wallet: boolean | null;
                notify_me_When_Others_like_my_artwork: boolean | null;
                notify_me_when_others_comment_on_my_artwork: boolean | null;
                notify_me_when_others_message_me: boolean | null;
                notify_me_when_others_purchase_my_artwork: boolean | null;
                notify_me_when_I_have_pending_orders: boolean | null;
                notify_me_when_I_can_Withdraw_from_my_wallet: boolean | null;
                notify_me_when_users_I_follow_post_a_new_artwork: boolean | null;
                notify_me_when_users_i_follow_like_an_artwork_in_my_moodboard: boolean | null;
                notify_me_when_users_I_follow_post_a_new_artwork_for_sale: boolean | null;
            };
            privacy_settings: {
                anyone_can_message_me: boolean | null;
                only_people_that_I_follow_can_message_me: boolean | null;
                only_users_who_follow_me_can_message_me: boolean | null;
                both_users_who_follow_me_and_who_I_follow_can_message_me: boolean | null;
                anyone_can_tag_me: boolean | null;
                only_people_that_I_follow_can_tag_me: boolean | null;
                only_users_who_follow_me_can_tag_me: boolean | null;
                both_users_who_follow_me_and_who_I_follow_can_tag_me: boolean | null;
                anyone_can_comment: boolean | null;
                only_people_that_I_follow_can_comment: boolean | null;
                only_users_who_follow_me_can_comment: boolean | null;
                both_users_who_follow_me_and_who_I_follow_can_comment: boolean | null;
            };
            blocking: {
                userId: string;
                user_name: string;
                profile_img: string;
            }[];
            billing: {
                holders_name: string;
                card_number: string;
                cvv: string;
                exp_d: string;
            };
            shipping: {
                country: string | null;
                state: string | null;
                address: string | null;
            };
        };
    }>;
    updateAccountSettings(accountSettingsDto: AccountSettingsDto): Promise<{
        status: number;
        message: string;
        data: {
            id: string;
            userId: string;
            email: string | null;
            artsony_link: string | null;
            notification: {
                nominate_for_art_of_the_week: boolean | null;
                use_my_artwork_on_artsony: boolean | null;
                use_my_artwork_for_social_media_post: boolean | null;
                like_my_art: boolean | null;
                comment_on_my_art: boolean | null;
                follow_me: boolean | null;
                message_me: boolean | null;
                respond_to_my_message: boolean | null;
                following_post_a_artwork: boolean | null;
                following_message_me: boolean | null;
                following_like_artworks_in_my_moodboard: boolean | null;
                following_post_artwork_for_sale: boolean | null;
                following_respond_to_my_message: boolean | null;
                my_artwork_hit_100_likes: boolean | null;
                my_artwork_hit_500_likes: boolean | null;
                my_artwork_hit_1000_likes: boolean | null;
                my_artwork_hit_10000_likes: boolean | null;
                my_artwork_hit_a_million_likes: boolean | null;
                users_purchase_my_artwork: boolean | null;
                buyers_message_me: boolean | null;
                a_buyer_gives_a_bad_review_on_my_artwork_purchased: boolean | null;
                a_buyer_wants_to_return_an_artwork: boolean | null;
                their_are_pending_orders: boolean | null;
                when_orders_are_activated: boolean | null;
                when_a_buyer_wants_to_return_an_order: boolean | null;
                when_an_order_arrives_damaged: boolean | null;
                can_make_withdrawal_from_my_wallet: boolean | null;
                withdraw_from_my_Wallet: boolean | null;
                notify_me_When_Others_like_my_artwork: boolean | null;
                notify_me_when_others_comment_on_my_artwork: boolean | null;
                notify_me_when_others_message_me: boolean | null;
                notify_me_when_others_purchase_my_artwork: boolean | null;
                notify_me_when_I_have_pending_orders: boolean | null;
                notify_me_when_I_can_Withdraw_from_my_wallet: boolean | null;
                notify_me_when_users_I_follow_post_a_new_artwork: boolean | null;
                notify_me_when_users_i_follow_like_an_artwork_in_my_moodboard: boolean | null;
                notify_me_when_users_I_follow_post_a_new_artwork_for_sale: boolean | null;
            };
            privacy_settings: {
                anyone_can_message_me: boolean | null;
                only_people_that_I_follow_can_message_me: boolean | null;
                only_users_who_follow_me_can_message_me: boolean | null;
                both_users_who_follow_me_and_who_I_follow_can_message_me: boolean | null;
                anyone_can_tag_me: boolean | null;
                only_people_that_I_follow_can_tag_me: boolean | null;
                only_users_who_follow_me_can_tag_me: boolean | null;
                both_users_who_follow_me_and_who_I_follow_can_tag_me: boolean | null;
                anyone_can_comment: boolean | null;
                only_people_that_I_follow_can_comment: boolean | null;
                only_users_who_follow_me_can_comment: boolean | null;
                both_users_who_follow_me_and_who_I_follow_can_comment: boolean | null;
            };
            blocking: {
                userId: string;
                user_name: string;
                profile_img: string;
            }[];
            billing: {
                holders_name: string;
                card_number: string;
                cvv: string;
                exp_d: string;
            };
            shipping: {
                country: string | null;
                state: string | null;
                address: string | null;
            };
        };
    }>;
}
