import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from '../user/entities/user.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @CurrentUser() currentUser: User, @Res() res: Response) {
    try {
      const post = await this.postService.create(createPostDto, currentUser);
      return res.status(200).json({
        message: "post created success",
        statusCode: 200,
        data: post
      });
    } catch (error) {
      return res.status(400).json({
        ...error
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const postList = await this.postService.findAll();
      return res.status(200).json({
        data: postList,
        message: 'list fetched success'
      });
    } catch (error) {
      return res.status(400).json({
        ...error
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
