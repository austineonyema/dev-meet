import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { tagInclude, TagWithRelations } from 'src/types/tag-with-relation';

//TODO to remove unnecessary user controller
@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  /**
   * This TypeScript function creates a new tag with specified data and includes related data using
   * Prisma.
   * @param {string} authorId - The `authorId` parameter is a string that represents the ID of the
   * author who is creating the tag.
   * @param {CreateTagDto} createTagDto - The `createTagDto` parameter is an object that contains the
   * data needed to create a new tag. It likely includes properties such as `name`, `description`,
   * `color`, or any other relevant information for the tag being created.
   * @returns The `create` method is returning a Promise that resolves to a `TagWithRelations` object.
   * This object includes the newly created tag data along with any related data specified in the
   * `tagInclude` variable.
   */
  async create(authorId: string, createTagDto: CreateTagDto): Promise<TagWithRelations> {
    return await this.prismaService.tag.create({
      data: {
        ...createTagDto,
        authorId,
      },
      include: tagInclude,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                ADMINISTRATOR POST                           */
  /* -------------------------------------------------------------------------- */
  /**
   * This TypeScript function creates a new tag with associated posts for a specific author.
   * @param {string} authorId - The `authorId` parameter is a string that represents the ID of the
   * author who is creating the tag.
   * @param {CreateTagDto} createTagDto - The `createTagDto` parameter is an object that contains data
   * for creating a new tag. It may include properties such as `name`, `description`, and `postIds`
   * which are the IDs of the posts associated with the tag.
   * @returns The function `createWithPosts` returns a Promise that resolves to a `TagWithRelations`
   * object. This object includes information about the newly created tag along with its relations,
   * such as posts connected to the tag.
   */
  async createWithPosts(authorId: string, createTagDto: CreateTagDto): Promise<TagWithRelations> {
    const validPostIds = await this.validatePosts(createTagDto.postIds);
    return await this.prismaService.tag.create({
      data: {
        ...createTagDto,
        authorId,
        posts: validPostIds.length
          ? {
              connect: validPostIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: tagInclude,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                GLOBAL POSTS                                */
  /* -------------------------------------------------------------------------- */

  /**
   * The `findAll` function asynchronously retrieves all tags with their related data using Prisma.
   * @returns An array of objects of type TagWithRelations is being returned. Each object represents a
   * tag with its related data included.
   */
  async findAll(): Promise<TagWithRelations[]> {
    return await this.prismaService.tag.findMany({
      include: tagInclude,
    });
  }

  /**
   * This TypeScript function asynchronously finds a tag by its ID and includes related data.
   * @param {string} id - The `findOne` method is an asynchronous function that takes an `id` parameter
   * of type `string`. This method retrieves a tag with the specified `id` from the database using
   * Prisma, including related data specified in the `tagInclude` variable.
   * @returns The `findOne` method is returning a `TagWithRelations` object.
   */
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

  /**
   * The function `update` updates a tag with the provided ID using data from `updateTagDto` and
   * returns the updated tag with relations.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * tag that needs to be updated.
   * @param {UpdateTagDto} updateTagDto - The `updateTagDto` parameter is an object that contains the
   * data to update for a tag. It likely includes properties such as `name`, `description`, or any
   * other fields that can be updated for a tag. This object is spread into the `data` field of the
   * `prismaService
   * @returns The `update` method in the code snippet is returning a Promise that resolves to a
   * `TagWithRelations` object after updating the tag with the provided `id` and `updateTagDto` data.
   */
  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagWithRelations> {
    return await this.prismaService.tag.update({
      where: {
        id,
      },
      data: {
        ...updateTagDto,
      },
      include: tagInclude,
    });
  }

  /**
   * The `remove` function in TypeScript asynchronously ensures a tag exists and then deletes it using
   * Prisma.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * tag that needs to be removed.
   */
  async remove(id: string): Promise<void> {
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
   * This function asynchronously finds all tags associated with a specific user ID.
   * @param {string} authorId - The `authorId` parameter is a string that represents the unique
   * identifier of the user whose tags you want to retrieve. This function `findAllByUser` is an
   * asynchronous function that returns a Promise, which resolves to an array of `TagWithRelations`
   * objects. It uses the `prismaService
   * @returns An array of `TagWithRelations` objects that match the `authorId` provided. Each object
   * includes additional related data specified in the `tagInclude` variable.
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
   * This TypeScript function finds a tag by its ID and author ID, including related data, and returns
   * it asynchronously.
   * @param {string} authorId - The `authorId` parameter is a string representing the unique identifier
   * of the author associated with the tag you are searching for.
   * @param {string} id - The `id` parameter in the `findOneByUser` function represents the unique
   * identifier of the tag that you want to find. It is used to query the database for a specific tag
   * based on its ID.
   * @returns The function `findOneByUser` returns a Promise that resolves to a `TagWithRelations`
   * object.
   */
  async findOneByUser(authorId: string, id: string): Promise<TagWithRelations> {
    const tag = await this.prismaService.tag.findFirst({
      where: {
        id,
        authorId,
      },
      include: tagInclude,
    });
    if (!tag) throw new NotFoundException(`tag ${id} not found`);
    return tag;
  }

  /**
   * This TypeScript function updates a tag by a specific user and returns the updated tag with
   * relations.
   * @param {string} authorId - The `authorId` parameter in the `updateByUser` function is a string
   * representing the ID of the author who is updating the tag.
   * @param {string} id - The `id` parameter in the `updateByUser` function is a string that represents
   * the unique identifier of the tag that needs to be updated.
   * @param {UpdateTagDto} updateTagDto - The `updateTagDto` parameter is an object that contains the
   * data to be updated for a tag. It likely includes properties such as `name`, `description`, or any
   * other fields that can be updated for a tag. This object is spread into the `data` field of the
   * `prisma
   * @returns The `updateByUser` function returns a Promise that resolves to a `TagWithRelations`
   * object after updating a tag with the provided `id` and `authorId` using the data from the
   * `updateTagDto`.
   */
  async updateByUser(
    authorId: string,
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<TagWithRelations> {
    // await this.findOneByUser(authorId, id);
    return await this.prismaService.tag.update({
      where: {
        id,
      },
      data: {
        ...updateTagDto,
      },
      include: tagInclude,
    });
  }

  /**
   * This TypeScript function removes a tag by its ID and author ID after finding it by the author ID
   * and tag ID.
   * @param {string} authorId - The `authorId` parameter in the `removeByUser` function is a string
   * that represents the unique identifier of the user who is performing the action of removing a tag.
   * @param {string} id - The `id` parameter is a unique identifier for the tag that you want to
   * remove. It is used to specify which tag should be deleted from the database.
   * @returns The `removeByUser` function is returning a Promise that resolves to `void`.
   */
  async removeByUser(authorId: string, id: string): Promise<void> {
    await this.prismaService.tag.delete({
      where: {
        id,
      },
    });
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                             INTERNAL UTILITIES                             */
  /* -------------------------------------------------------------------------- */

  /**
   * The function `ensureTagExists` checks if a tag with a specific ID exists in the database and
   * throws an exception if it does not.
   * @param {string} id - The `id` parameter in the `ensureTagExists` function is a string representing
   * the unique identifier of a tag that needs to be checked for existence in the database.
   */
  private async ensureTagExists(id: string) {
    const exists = await this.prismaService.tag.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Post ${id} not found`);
  }

  /**
   * The function `validatePosts` checks if the provided post IDs are valid and returns an array of
   * valid post IDs.
   * @param {string[]} [postIds] - The `postIds` parameter is an optional array of strings that
   * represent the IDs of posts to be validated. If `postIds` is not provided or is an empty array, the
   * function will return an empty array. Otherwise, it will query the database to find posts with IDs
   * matching those in the
   * @returns The `validatePosts` function returns a Promise that resolves to an array of valid post
   * IDs. If the `postIds` array is empty or undefined, an empty array is returned. The function
   * queries the database to find posts with IDs that match the ones provided in the `postIds` array.
   * If any of the provided post IDs are not found in the database, a `BadRequestException` is
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
