import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createCommentDto: CreateCommentDto, currentUser: User) {
    try {
      const postDetails = await this.postRepository.findOne({
        where: { id: createCommentDto.postId }
      });
      const userDetails = await this.userRepository.findOne({ where: { id: currentUser.id } });
      if (!postDetails) {
        throw new BadRequestException('No Post Found', { cause: new Error(), description: 'No Post Found' }).getResponse();
      }
      // postDetails.comments = 
      // this.postRepository.update({id:postDetails.id},)
      const commentObj = this.commentRepository.create({
        content: createCommentDto.content,
        user:userDetails,
        post:postDetails
      });
      const commentEntity = await this.commentRepository.save(commentObj);
      return commentEntity;
    } catch (error) {
      console.log(error,'errorr');
      return Promise.reject(error);
    }
  }

  async findAll() {
    try {
      return this.commentRepository.find({
        loadRelationIds: true
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
