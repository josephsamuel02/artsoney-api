import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AccountSettingsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  artsony_link?: string;

  @ApiPropertyOptional()
  @IsOptional()
  notification?: Notification;

  @ApiPropertyOptional()
  @IsOptional()
  privacy_settings?: PrivacySettings;

  @ApiPropertyOptional()
  @IsOptional()
  blocking?: Blocking[];

  @ApiPropertyOptional()
  @IsOptional()
  billing?: Billing;

  @ApiPropertyOptional()
  @IsOptional()
  shipping?: Shipping;
}

interface Notification {
  nominate_for_art_of_the_week?: boolean;
  use_my_artwork_on_artsony?: boolean;
  use_my_artwork_for_social_media_post?: boolean;

  like_my_art?: boolean;
  comment_on_my_art?: boolean;
  follow_me?: boolean;
  message_me?: boolean;
  respond_to_my_message?: boolean;

  following_post_a_artwork?: boolean;
  following_message_me?: boolean;
  following_like_artworks_in_my_moodboard?: boolean;
  following_post_artwork_for_sale?: boolean;
  following_respond_to_my_message?: boolean;

  my_artwork_hit_100_likes?: boolean;
  my_artwork_hit_500_likes?: boolean;
  my_artwork_hit_1000_likes?: boolean;
  my_artwork_hit_10000_likes?: boolean;
  my_artwork_hit_a_million_likes?: boolean;

  users_purchase_my_artwork?: boolean;
  buyers_message_me?: boolean;
  a_buyer_gives_a_bad_review_on_my_artwork_purchased?: boolean;
  a_buyer_wants_to_return_an_artwork?: boolean;

  their_are_pending_orders?: boolean;
  when_orders_are_activated?: boolean;
  when_a_buyer_wants_to_return_an_order?: boolean;
  when_an_order_arrives_damaged?: boolean;

  can_make_withdrawal_from_my_wallet?: boolean;
  withdraw_from_my_Wallet?: boolean;

  notify_me_When_Others_like_my_artwork?: boolean;
  notify_me_when_others_comment_on_my_artwork?: boolean;
  notify_me_when_others_message_me?: boolean;
  notify_me_when_others_purchase_my_artwork?: boolean;
  notify_me_when_I_have_pending_orders?: boolean;
  notify_me_when_I_can_Withdraw_from_my_wallet?: boolean;
  notify_me_when_users_I_follow_post_a_new_artwork?: boolean;
  notify_me_when_users_i_follow_like_an_artwork_in_my_moodboard?: boolean;
  notify_me_when_users_I_follow_post_a_new_artwork_for_sale?: boolean;
}

interface PrivacySettings {
  anyone_can_message_me?: boolean;
  only_people_that_I_follow_can_message_me?: boolean;
  only_users_who_follow_me_can_message_me?: boolean;
  both_users_who_follow_me_and_who_I_follow_can_message_me?: boolean;

  anyone_can_tag_me?: boolean;
  only_people_that_I_follow_can_tag_me?: boolean;
  only_users_who_follow_me_can_tag_me?: boolean;
  both_users_who_follow_me_and_who_I_follow_can_tag_me?: boolean;

  anyone_can_comment?: boolean;
  only_people_that_I_follow_can_comment?: boolean;
  only_users_who_follow_me_can_comment?: boolean;
  both_users_who_follow_me_and_who_I_follow_can_comment?: boolean;
}

interface Blocking {
  userId: string;
  user_name: string;
  profile_img: string;
}

interface Billing {
  holders_name: string;
  card_number: string;
  cvv: string;
  exp_d: string;
}

interface Shipping {
  country: string;
  state: string;
  address: string;
}
