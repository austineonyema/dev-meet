import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { UUID } from 'crypto';
import type { AuthUser } from 'src/auth/types/auth-request';
import { CurrentUser } from 'src/commons/decorators/current-user';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user-post')
@UseGuards(JwtAuthGuard)
export class UserPostController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: AuthUser, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user.userId, createPostDto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.postsService.findAllByUser(user.userId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: UUID) {
    return this.postsService.findOneByUser(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updateByUser(user.userId, id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: UUID) {
    return this.postsService.removeByUser(user.userId, id);
  }
}
