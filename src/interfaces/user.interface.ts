export interface UserDto {
  name: string;
  address: string;
  telegram_id: string;
  wallet_address: string;
}

export interface CreateUserResponse {
  result: boolean;
  message: string;
  user_api_key: string;
}
