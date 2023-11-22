import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  /* Post */
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.createPost(
      createPostDto,
      request.cookies['publicId'],
    );
  }
  @Get(':postId')
  findPost(@Param('postId') id: string) {
    return this.postService.findPost(+id);
  }

  @Patch(':postId')
  updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: Request,
  ) {
    return this.postService.updatePost(
      +postId,
      updatePostDto,
      request.cookies['publicId'],
    );
  }

  @Delete(':postId')
  remove(@Param('postId') postId: string) {
    return this.postService.removePost(+postId);
  }
  /* like */
  @Post('like/:postId')
  createLike(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.createLike(+postId, request.cookies['publicId']);
  }

  @Delete('like/:postId')
  removeLike(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.removeLike(+postId, request.cookies['publicId']);
  }

  /* comment */
  @Post('comment')
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request,
  ) {
    return this.postService.createComment(
      createCommentDto,
      request.cookies['publicId'],
    );
  }
}
