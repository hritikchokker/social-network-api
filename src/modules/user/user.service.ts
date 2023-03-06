import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { NestApplication } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Session } from '../session/entities/session.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>
  ) {
    //  this.dataSource.dropDatabase().then();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: createUserDto.email }
      });
      if (user) {
        throw new BadRequestException('User Already exists', { cause: new Error(), description: 'user already exists' }).getResponse();
      }
      const userEntity = this.usersRepository.create({ ...createUserDto });
      const userDetails = await this.usersRepository.save(userEntity);
      // const token = await this.jwtService.signAsync({
      //   email: userDetails.email,
      //   id: userDetails.id
      // }, { expiresIn: '1h', secret: 'supersecret' });

      // return token;
      return userDetails;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
