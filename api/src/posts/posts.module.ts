import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserPostController } from './user-post.controller';

@Module({
  controllers: [PostsController, UserPostController],
  providers: [PostsService],
})
export class PostsModule {}
