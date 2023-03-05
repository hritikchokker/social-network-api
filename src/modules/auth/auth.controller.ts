import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, Res, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { USER_INSERTED } from 'src/common/constants/response.constants';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { HttpExceptionFilter } from 'src/common/httpresponse/http_exception.filter';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

// @UseFilters(new HttpExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @Post('register')
  @ResponseMessage(USER_INSERTED)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const token = await this.authService.create(createUserDto);
      return res.status(201).json({
        statusCode: 201,
        message: USER_INSERTED,
        token
      });
    } catch (error) {
      return res.status(error?.statusCode)?.json({ ...error })
    }
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@CurrentUser() currentUser: any, @Res() res: Response) {
    return res.status(200).json({
      ...currentUser
    });
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
