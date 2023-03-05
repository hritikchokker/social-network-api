import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpCode, UseFilters, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpResponseInterceptor } from 'src/common/httpresponse/httpresponse.interceptor';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { USER_INSERTED } from 'src/common/constants/response.constants';
import { HttpExceptionFilter } from 'src/common/httpresponse/http_exception.filter';
import { Response } from 'express';

// @UseInterceptors(HttpResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  // @Post()
  // @ResponseMessage(USER_INSERTED)
  // async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
  //   try {
  //     const token = await this.userService.create(createUserDto);
  //     console.log(token,'token');
  //     return response.status(201).json({ statusCode: 201, message: 'user created succesfully', token });
  //   } catch (error) {
  //     return response.status(error?.statusCode).json({ ...error });
  //   }
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
