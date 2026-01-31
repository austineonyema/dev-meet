import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { UserTagsController } from './user-tags.controller';

@Module({
  controllers: [TagsController, UserTagsController],
  providers: [TagsService],
})
export class TagsModule {}
