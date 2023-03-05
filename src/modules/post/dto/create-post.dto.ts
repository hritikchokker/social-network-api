import { User } from "src/modules/user/entities/user.entity";

export class CreatePostDto {
    id?: number;
    title: string;
    content: string;
    isActive?: boolean
    user?: User
}
