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
  findPost(@Param('postId') id: string) {
    return this.postService.findPost(+id);
  }
  @Get('camp/:campName')
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
  @Post('likes/:postId')
  createLike(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.createLike(+postId, request.cookies['publicId']);
  }

  @Get('likes/:postId')
  getLikes(@Param('postId') postId: string) {
    return this.postService.findLikesByPostId(+postId);
  }

  @Delete('likes/:postId')
  removeLike(@Param('postId') postId: string, @Req() request: Request) {
    return this.postService.removeLike(+postId, request.cookies['publicId']);
  }

  /* comment */
  @Post('comments')
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request,
  ) {
    return this.postService.createComment(
      createCommentDto,
      request.cookies['publicId'],
    );
  }

  @Patch('comments/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommenttDto,
    @Req() request: Request,
  ) {
    return this.postService.updateComment(
      +commentId,
      updateCommentDto,
      request.cookies['publicId'],
    );
  }

  @Delete('comments/:commentId')
  removeComment(
    @Param('commentId') commentId: string,
    @Req() request: Request,
  ) {
    return this.postService.removeComment(
      +commentId,
      request.cookies['publicId'],
    );
  }
}
