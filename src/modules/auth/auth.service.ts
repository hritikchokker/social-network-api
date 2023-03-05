import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) {
  }


  async validateUser(userId: number): Promise<User> {
    try {
      const user = await this.usersService.findOne(userId);
      if (!user) return null;
      if (!user) {
        throw new NotAcceptableException('could not find the user');
      }
      if (user) {
        return user;
      }
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  createToken(payload: string | object | Buffer): Promise<string> {
    return this.jwtService.signAsync(payload);
  }


  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const res: User = await this.usersService.create(createUserDto);
      const token = await this.jwtService.signAsync({ email: res.email, id: res.id });
      return token;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
