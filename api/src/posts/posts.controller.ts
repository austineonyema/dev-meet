import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/commons/decorators/current-user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { UUID } from 'crypto';
import type { AuthUser } from 'src/auth/types/auth-request';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: AuthUser, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user.userId, createPostDto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.postsService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: UUID) {
    return this.postsService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(user.userId, id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: UUID) {
    return this.postsService.remove(user.userId, id);
  }
}
