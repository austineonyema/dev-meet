import { PartialType } from '@nestjs/mapped-types';
import { CreatePostlikeDto } from './create-postlike.dto';

export class UpdatePostlikeDto extends PartialType(CreatePostlikeDto) {}
