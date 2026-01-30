import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  async create(authorId: string, createPostDto: CreatePostDto): Promise<CreatePostDto> {
    const post = await this.prismaService.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
    });
    return post;
  }

  async findAll(authorId: string): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return posts;
  }

  async findOne(authorId: string, id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
        authorId,
      },
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  async update(authorId: string, id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.findOne(authorId, id);
    const upDate = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
        authorId,
      },
    });
    return upDate;
  }

  async remove(authorId: string, id: string): Promise<void> {
    await this.findOne(authorId, id);
    await this.prismaService.post.delete({
      where: {
        id,
        authorId,
      },
    });
    return;
  }
}
