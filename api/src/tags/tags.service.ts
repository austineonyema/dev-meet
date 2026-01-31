import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { tagInclude, TagWithRelations } from 'src/types/tag-with-relation';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async create(authorId: string, createTagDto: CreateTagDto): Promise<TagWithRelations> {
    return await this.prismaService.tag.create({
      data: {
        ...createTagDto,
        authorId,
      },
      include: tagInclude,
    });
  }

  async findAll(): Promise<TagWithRelations[]> {
    return await this.prismaService.tag.findMany({
      include: tagInclude,
    });
  }

  async findOne(id: string): Promise<TagWithRelations> {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
      include: tagInclude,
    });
    if (!tag) throw new NotFoundException(`tag with id: ${id} not found`);
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagWithRelations> {
    await this.findOne(id);
    const updated = await this.prismaService.tag.update({
      where: {
        id,
      },
      data: {
        ...updateTagDto,
      },
      include: tagInclude,
    });
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prismaService.tag.delete({
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
  async findAllByUser(authorId: string): Promise<TagWithRelations[]> {
    return await this.prismaService.tag.findMany({
      where: {
        authorId,
      },
      include: tagInclude,
    });
  }

  /**
   * Get one post belonging to a specific user
   */
  async findOneByUser(authorId: string, id: string): Promise<TagWithRelations> {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
        authorId,
      },
      include: tagInclude,
    });
    if (!tag) throw new NotFoundException(`tag ${id} not found`);
    return tag;
  }

  async updateByUser(
    authorId: string,
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<TagWithRelations> {
    await this.findOneByUser(authorId, id);
    const updated = await this.prismaService.tag.update({
      where: {
        id,
        authorId,
      },
      data: {
        ...updateTagDto,
      },
      include: tagInclude,
    });
    return updated;
  }

  async removeByUser(authorId: string, id: string): Promise<void> {
    await this.findOneByUser(authorId, id);
    await this.prismaService.tag.delete({
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
    const exists = await this.prismaService.tag.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Post ${id} not found`);
  }

  /**
   * Ensures all Post IDs exist before connecting them
   */
  private async validatePosts(postIds?: string[]): Promise<string[]> {
    if (!postIds || postIds.length === 0) return [];
    const validPosts = await this.prismaService.post.findMany({
      where: { id: { in: postIds } },
      select: { id: true },
    });
    if (validPosts.length !== postIds.length) {
      throw new BadRequestException('Some tag IDs are invalid');
    }
    return validPosts.map((tag) => tag.id);
  }
}
