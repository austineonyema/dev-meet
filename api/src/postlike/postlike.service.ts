import { Injectable } from '@nestjs/common';
import { CreatePostlikeDto } from './dto/create-postlike.dto';
import { UpdatePostlikeDto } from './dto/update-postlike.dto';

@Injectable()
export class PostlikeService {
  create(createPostlikeDto: CreatePostlikeDto) {
    return 'This action adds a new postlike';
  }

  findAll() {
    return `This action returns all postlike`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postlike`;
  }

  update(id: number, updatePostlikeDto: UpdatePostlikeDto) {
    return `This action updates a #${id} postlike`;
  }

  remove(id: number) {
    return `This action removes a #${id} postlike`;
  }
}
