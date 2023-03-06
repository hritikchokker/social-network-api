import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { User } from '../user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() currentUser: User, @Res() res: Response) {
    try {
      const comment = await this.commentService.create(createCommentDto, currentUser);
      return res.status(200).json({
        message: "comment created success",
        statusCode: 200,
        data: comment
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
      const commentList = await this.commentService.findAll();
      return res.status(200).json({
        data: commentList,
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
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
