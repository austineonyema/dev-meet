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

  async findAll(): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.findOne(id);
    const upDate = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
    });
    return upDate;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prismaService.post.delete({
      where: {
        id,
      },
    });
    return;
  }

  // ---------------- User Specific -------------------

  async findAllByUser(authorId: string): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return posts;
  }

  async findOneByUser(authorId: string, id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
        authorId,
      },
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  async updateByUser(authorId: string, id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.findOneByUser(authorId, id);
    const upDate = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
    });
    return upDate;
  }

  async removeByUser(authorId: string, id: string): Promise<void> {
    await this.findOneByUser(authorId, id);
    await this.prismaService.post.delete({
      where: {
        id,
        authorId,
      },
    });
    return;
  }
}
