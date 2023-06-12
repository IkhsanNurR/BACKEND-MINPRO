import { usersAttributes } from "models/usersSchema";

export class CreateProfileDto implements usersAttributes {
    user_entity_id: number;
    user_name?: string;
    user_first_name?: string;
    user_last_name?: string;
    user_birth_date?: string;
    user_photo?: string;
    user_password?: string;
}
