export class CreateUserDto {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    isActive?:boolean
}
