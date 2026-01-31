import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { postInclude, PostWithRelations } from 'src/types/post-with-relation';

@Injectable()
export class PostsService {
  /**
   * Creates an instance of PostsService.
   *
   * @constructor
   * @param {PrismaService} prismaService
   */
  constructor(private prismaService: PrismaService) {}

  async create(authorId: string, createPostDto: CreatePostDto): Promise<PostWithRelations> {
    const validTagIds = await this.validateTags(createPostDto.tagIds);
    return await this.prismaService.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published ?? false,
        authorId,
        tags: validTagIds.length
          ? {
              connect: validTagIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: postInclude,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                GLOBAL POSTS                                */
  /* -------------------------------------------------------------------------- */

  /**
   * Fetch all posts (public feed)
   */
  async findAll(): Promise<PostWithRelations[]> {
    return this.prismaService.post.findMany({
      include: postInclude,
    });
  }

  /**
   * Fetch single post by ID
   */
  async findOne(id: string): Promise<PostWithRelations> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id,
      },
      include: postInclude,
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostWithRelations> {
    await this.ensurePostExists(id);
    return this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
      include: postInclude,
    });
  }

  async remove(id: string): Promise<void> {
    await this.ensurePostExists(id);
    await this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                              USER-SCOPED POSTS                             */
  /* -------------------------------------------------------------------------- */

  /**
   * Posts created by a specific user
   */
  async findAllByUser(authorId: string): Promise<PostWithRelations[]> {
    return await this.prismaService.post.findMany({
      where: {
        authorId,
      },
      include: postInclude,
    });
  }

  /**
   * Get one post belonging to a specific user
   */
  async findOneByUser(authorId: string, id: string): Promise<PostWithRelations> {
    const post = await this.prismaService.post.findFirst({
      where: {
        id,
        authorId,
      },
      include: postInclude,
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  async updateByUser(
    authorId: string,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostWithRelations> {
    await this.findOneByUser(authorId, id);
    const upDate = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
      include: postInclude,
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

  /* -------------------------------------------------------------------------- */
  /*                             INTERNAL UTILITIES                             */
  /* -------------------------------------------------------------------------- */
  /**
   * Ensures post exists before further manipulation
   */
  private async ensurePostExists(id: string) {
    const exists = await this.prismaService.post.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Post ${id} not found`);
  }

  /**
   * Ensures all tag IDs exist before connecting them
   */
  private async validateTags(tagIds?: string[]): Promise<string[]> {
    if (!tagIds || tagIds.length === 0) return [];
    const validTags = await this.prismaService.tag.findMany({
      where: { id: { in: tagIds } },
      select: { id: true },
    });
    if (validTags.length !== tagIds.length) {
      throw new BadRequestException('Some tag IDs are invalid');
    }
    return validTags.map((tag) => tag.id);
  }
}
