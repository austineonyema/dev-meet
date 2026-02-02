import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentlikeService } from './commentlike.service';
import { CreateCommentlikeDto } from './dto/create-commentlike.dto';
import { UpdateCommentlikeDto } from './dto/update-commentlike.dto';

@Controller('commentlike')
export class CommentlikeController {
  constructor(private readonly commentlikeService: CommentlikeService) {}

  @Post()
  create(@Body() createCommentlikeDto: CreateCommentlikeDto) {
    return this.commentlikeService.create(createCommentlikeDto);
  }

  @Get()
  findAll() {
    return this.commentlikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentlikeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentlikeDto: UpdateCommentlikeDto) {
    return this.commentlikeService.update(+id, updateCommentlikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentlikeService.remove(+id);
  }
}
