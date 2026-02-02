import { Module } from '@nestjs/common';
import { PostlikeService } from './postlike.service';
import { PostlikeController } from './postlike.controller';

@Module({
  controllers: [PostlikeController],
  providers: [PostlikeService],
})
export class PostlikeModule {}
