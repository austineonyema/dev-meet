import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Tag, User } from '@prisma/client';

/**
 * Description placeholder
 *
 * @export
 * @class PostsService
 * @typedef {PostsService}
 */
@Injectable()
export class PostsService {
  /**
   * Creates an instance of PostsService.
   *
   * @constructor
   * @param {PrismaService} prismaService
   */
  constructor(private prismaService: PrismaService) {}
  /**
   * Description placeholder
   *
   * @async
   * @param {string} authorId
   * @param {CreatePostDto} createPostDto
   * @returns {Promise<Promise<Post & { author: User; tags: Tag[] }>>}
   */
  async create(
    authorId: string,
    createPostDto: CreatePostDto,
  ): Promise<Promise<Post & { author: User; tags: Tag[] }>> {
    const validTagIds = await this.validateTags(createPostDto.tagIds);
    const post = await this.prismaService.post.create({
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
      include: {
        author: true,
        tags: true,
      },
    });
    return post;
  }

  /**
   * Validates that all tag IDs exist in the database.
   * Returns an array of valid tag IDs to be used in Prisma connect.
   * Throws BadRequestException if any tag ID is invalid.
   *
   * @private
   * @async
   * @param {?string[]} [tagIds]
   * @returns {Promise<string[]>}
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

  /**
   * Description placeholder
   *
   * @async
   * @returns {Promise<Post[]>}
   */
  async findAll(): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {string} id
   * @returns {Promise<Post>}
   */
  async findOne(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {string} id
   * @param {UpdatePostDto} updatePostDto
   * @returns {Promise<Post>}
   */
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

  /**
   * Description placeholder
   *
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
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

  /**
   * Description placeholder
   *
   * @async
   * @param {string} authorId
   * @returns {Promise<Post[]>}
   */
  async findAllByUser(authorId: string): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return posts;
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {string} authorId
   * @param {string} id
   * @returns {Promise<Post>}
   */
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

  /**
   * Description placeholder
   *
   * @async
   * @param {string} authorId
   * @param {string} id
   * @param {UpdatePostDto} updatePostDto
   * @returns {Promise<Post>}
   */
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

  /**
   * Description placeholder
   *
   * @async
   * @param {string} authorId
   * @param {string} id
   * @returns {Promise<void>}
   */
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
