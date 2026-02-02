import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostlikeService } from './postlike.service';
import { CreatePostlikeDto } from './dto/create-postlike.dto';
import { UpdatePostlikeDto } from './dto/update-postlike.dto';

@Controller('postlike')
export class PostlikeController {
  constructor(private readonly postlikeService: PostlikeService) {}

  @Post()
  create(@Body() createPostlikeDto: CreatePostlikeDto) {
    return this.postlikeService.create(createPostlikeDto);
  }

  @Get()
  findAll() {
    return this.postlikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postlikeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostlikeDto: UpdatePostlikeDto) {
    return this.postlikeService.update(+id, updatePostlikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postlikeService.remove(+id);
  }
}
