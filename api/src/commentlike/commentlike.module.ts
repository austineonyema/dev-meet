import { Module } from '@nestjs/common';
import { CommentlikeService } from './commentlike.service';
import { CommentlikeController } from './commentlike.controller';

@Module({
  controllers: [CommentlikeController],
  providers: [CommentlikeService],
})
export class CommentlikeModule {}
