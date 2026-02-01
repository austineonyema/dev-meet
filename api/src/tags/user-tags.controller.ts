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
import type { AuthUser } from 'src/auth/types/auth-request';
import { CurrentUser } from 'src/commons/decorators/current-user';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';
import type { UUID } from 'crypto';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user-tags')
@UseGuards(JwtAuthGuard)
export class UserTagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: AuthUser, @Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(user.userId, createTagDto);
  }

  @Get()
  findAllByUser(@CurrentUser() user: AuthUser) {
    return this.tagsService.findAllByUser(user.userId);
  }

  @Get(':id')
  findOneByUser(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: UUID) {
    return this.tagsService.findOneByUser(user.userId, id);
  }

  @Patch(':id')
  updateByUser(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.updateByUser(user.userId, id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeByUser(@CurrentUser() user: AuthUser, @Param('id', ParseUUIDPipe) id: UUID) {
    return this.tagsService.removeByUser(user.userId, id);
  }
}
