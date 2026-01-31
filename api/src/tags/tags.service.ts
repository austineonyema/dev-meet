import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async create(authorId: string, createTagDto: CreateTagDto): Promise<CreateTagDto> {
    const tag = await this.prismaService.tag.create({
      data: {
        ...createTagDto,
        authorId,
      },
    });
    return tag;
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.prismaService.tag.findMany();
    return tags;
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });
    if (!tag) throw new NotFoundException(`tag with id: ${id} not found`);
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    await this.findOne(id);
    const updated = await this.prismaService.tag.update({
      where: {
        id,
      },
      data: {
        ...updateTagDto,
      },
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
    return;
  }

  //-------------------- User Specific -------------------

  async findAllByUser(authorId: string): Promise<Tag[]> {
    const tags = await this.prismaService.tag.findMany({
      where: {
        authorId,
      },
    });
    return tags;
  }

  async findOneByUser(authorId: string, id: string): Promise<Tag> {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
        authorId,
      },
    });
    if (!tag) throw new NotFoundException(`tag with id: ${id} not found`);
    return tag;
  }

  async updateByUser(authorId: string, id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    await this.findOneByUser(authorId, id);
    const updated = await this.prismaService.tag.update({
      where: {
        id,
        authorId,
      },
      data: {
        ...updateTagDto,
      },
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
}
