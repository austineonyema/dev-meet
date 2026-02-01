import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import type { UUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { AuthUser } from 'src/auth/types/auth-request';
import { CurrentUser } from 'src/commons/decorators/current-user';
import { CreateTagDto } from './dto/create-tag.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';

@Controller('tags')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser() user: AuthUser, @Body() createTagDto: CreateTagDto) {
    return this.tagsService.createWithPosts(user.userId, createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.tagsService.remove(id);
  }
}
