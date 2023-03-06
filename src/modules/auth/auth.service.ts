import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { createHash, verifyHash } from 'src/utils/hash_helper';
import { Repository } from 'typeorm';
import { Session } from '../session/entities/session.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
// import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


class UserService {
  findOne(p: any): any {

  }

  create(s: any): any {

  }
}
@Injectable()
export class AuthService {

  usersService = new UserService();
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    // private readonly usersService: UserService,
    @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
    private jwtService: JwtService
  ) {
  }


  async validateUser(userId: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId }
      });
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

  async login(userDetails: { email: string, password: string }) {
    const user = await this.usersRepository.findOne({
      where: { email: userDetails.email }
    });
    if (!user) {
      throw new BadRequestException('NO User found', { cause: new Error(), description: 'user already exists' }).getResponse();
    }
    if (!await verifyHash(userDetails.password, user.password)) {
      throw new BadRequestException('Wrong Credentials', { cause: new Error(), description: 'Password or email is not valid' }).getResponse();
    }
    const session = new Session();
    session.user = user;
    session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    session.sessionId = randomUUID();
    await this.sessionRepository.save(session);
    const token = await this.jwtService.signAsync({ email: userDetails.email, id: user.id, expiresAt: session.expiresAt, sessionId: session.sessionId });
    return token;
  }

  createToken(payload: string | object | Buffer): Promise<string> {
    return this.jwtService.signAsync(payload);
  }


  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: createUserDto.email }
      });
      if (user) {
        throw new BadRequestException('User Already exists', { cause: new Error(), description: 'user already exists' }).getResponse();
      }
      createUserDto.password = await createHash(createUserDto.password);
      const userEntity = this.usersRepository.create({ ...createUserDto });
      const userDetails = await this.usersRepository.save(userEntity);
      const session = new Session();
      session.user = userDetails;
      session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
      session.sessionId = randomUUID();
      await this.sessionRepository.save(session);
      const token = await this.jwtService.signAsync({ email: userDetails.email, id: userDetails.id, expiresAt: session.expiresAt, sessionId: session.sessionId });
      return token;
    } catch (error) {
      console.log(error, 'eree');
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
