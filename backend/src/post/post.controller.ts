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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCommenttDto } from './dto/update-comment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  /* Post */
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createPostDto: CreatePostDto,
    @Req() request: Request,
  ) {
    return this.postService.createPost(
      files,
      createPostDto,
      request.cookies['publicId'],
    );
  }

  @Get(':postId')
  findPost(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.findPostWithUrls(
      +postId,
      request.cookies['publicId'],
    );
  }

  @Get('camps/:campName')
  findAllPosts(@Param('campName') campName: string) {
    return this.postService.findAllPostsByCampName(campName);
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
  @Get(':postId/likes')
  getLikes(@Param('postId') postId: string) {
    return this.postService.countLikes(+postId);
  }

  @Post(':postId/likes')
  createLike(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.createLike(+postId, request.cookies['publicId']);
  }

  @Delete(':postId/likes')
  removeLike(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.removeLike(+postId, request.cookies['publicId']);
  }

  /* comment */
  @Get(':postId/comments')
  findComments(@Param('postId') postId: string) {
    return this.postService.findCommentsByPostId(+postId);
  }

  @Post(':postId/comments')
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request,
  ) {
    return this.postService.createComment(
      +postId,
      createCommentDto.content,
      request.cookies['publicId'],
    );
  }

  @Patch(':postId/comments/:commentId')
  updateComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommenttDto,
    @Req() request: Request,
  ) {
    return this.postService.updateComment(
      +postId,
      +commentId,
      updateCommentDto.content,
      request.cookies['publicId'],
    );
  }

  @Delete(':postId/comments/:commentId')
  removeComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Req() request: Request,
  ) {
    return this.postService.removeComment(
      +postId,
      +commentId,
      request.cookies['publicId'],
    );
  }
}
