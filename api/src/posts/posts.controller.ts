import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { UUID } from 'crypto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from 'src/commons/decorators/current-user';
import type { AuthUser } from 'src/auth/types/auth-request';

@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: AuthUser, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user.userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.postsService.remove(id);
  }
}
