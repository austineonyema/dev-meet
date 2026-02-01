import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { postInclude, PostWithRelations } from 'src/types/post-with-relation';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  /**
   * This function creates a new post with specified details and tags, and returns the post with related
   * data.
   * @param {string} authorId - The `authorId` parameter in the `create` function is a string that
   * represents the ID of the author who is creating the post. This ID is used to associate the post
   * with the author in the database.
   * @param {CreatePostDto} createPostDto - The `createPostDto` parameter seems to be an object that
   * contains properties related to creating a post. Based on the usage in your `create` function, it
   * likely includes the following properties:
   * @returns The `create` method is returning a Promise that resolves to a `PostWithRelations` object.
   * This object includes the newly created post data along with any related data specified in the
   * `postInclude` variable.
   */
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
   * This TypeScript function asynchronously retrieves all posts with their related data using Prisma.
   * @returns An array of `PostWithRelations` objects is being returned asynchronously.
   */
  async findAll(): Promise<PostWithRelations[]> {
    return this.prismaService.post.findMany({
      include: postInclude,
    });
  }

  /**
   * This TypeScript function asynchronously finds a post with the specified ID and includes related
   * data, throwing a NotFoundException if the post is not found.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * post you want to find in the database.
   * @returns The `findOne` function is returning a `PostWithRelations` object. This object represents
   * a post retrieved from the database using the provided `id`. If the post is not found, a
   * `NotFoundException` is thrown with a message indicating that the post with the specified `id` was
   * not found.
   */
  async findOne(id: string): Promise<PostWithRelations> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: postInclude,
    });
    if (!post) throw new NotFoundException(`Post with id : ${id} not found`);
    return post;
  }

  /**
   * This TypeScript function updates a post with the provided data and includes related entities.
   * @param {string} id - The `id` parameter in the `update` function is a string that represents the
   * unique identifier of the post that you want to update. It is used to locate the specific post in
   * the database that you want to modify.
   * @param {UpdatePostDto} updatePostDto - The `updatePostDto` parameter in the `update` function
   * likely represents a Data Transfer Object (DTO) containing the updated information for a post. It
   * could include fields such as `title`, `content`, `author`, `tags`, or any other properties that
   * can be updated for a post.
   * @returns The `update` method is returning a Promise that resolves to a `PostWithRelations` object
   * after updating the post with the provided `updatePostDto` data. The updated post is fetched along
   * with its related data specified in the `postInclude` variable.
   */
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

  /**
   * The `remove` function in TypeScript ensures a post exists and then deletes it using Prisma.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * post that needs to be removed.
   */
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
   * This function finds all posts by a specific user and includes related data.
   * @param {string} authorId - The `authorId` parameter is a string that represents the unique
   * identifier of the author whose posts you want to retrieve.
   * @returns An array of `PostWithRelations` objects is being returned.
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
   * This TypeScript function finds a post by user ID and post ID, including related data, and throws
   * an exception if the post is not found.
   * @param {string} authorId - The `authorId` parameter in the `findOneByUser` function is a string
   * that represents the unique identifier of the author of the post. It is used to filter the search
   * for a post based on both the post ID (`id`) and the author ID (`authorId`).
   * @param {string} id - The `id` parameter in the `findOneByUser` function represents the unique
   * identifier of the post that you are trying to find. It is used to query the database and retrieve
   * the post with the specified `id`.
   * @returns The function `findOneByUser` is returning a Promise that resolves to a
   * `PostWithRelations` object. This object represents a post retrieved from the database using the
   * `prismaService.post.findFirst` method with the specified `id` and `authorId`. If the post is not
   * found, a `NotFoundException` is thrown with a message indicating that the post with the given `id`
   * was
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

  /**
   * This TypeScript function updates a post by a specific user and returns the updated post with
   * relations.
   * @param {string} authorId - The `authorId` parameter in the `updateByUser` function represents the
   * unique identifier of the user who is updating the post. This identifier is used to ensure that the
   * user has the necessary permissions to update the post with the specified `id`.
   * @param {string} id - The `id` parameter in the `updateByUser` function represents the unique
   * identifier of the post that you want to update. It is used to locate the specific post in the
   * database that you wish to modify.
   * @param {UpdatePostDto} updatePostDto - The `updatePostDto` parameter in the `updateByUser`
   * function likely contains the data that needs to be updated for a specific post. It could include
   * fields such as the post title, content, tags, or any other information that can be updated for a
   * post. This parameter is used to
   * @returns The `updateByUser` function returns a Promise that resolves to a `PostWithRelations`
   * object after updating a post with the provided `updatePostDto` data for the specified `id`
   * belonging to the `authorId`.
   */
  async updateByUser(
    authorId: string,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostWithRelations> {
    await this.findOneByUser(authorId, id);
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
      include: postInclude,
    });
  }

  /**
   * This TypeScript function removes a post by a specific user based on the authorId and post id.
   * @param {string} authorId - The `authorId` parameter in the `removeByUser` function is a string
   * that represents the unique identifier of the user who is the author of the post to be removed.
   * @param {string} id - The `id` parameter in the `removeByUser` function represents the unique
   * identifier of the post that you want to remove.
   * @returns The `removeByUser` function is returning a Promise that resolves to `void`.
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

  /* -------------------------------------------------------------------------- */
  /*                             INTERNAL UTILITIES                             */
  /* -------------------------------------------------------------------------- */

  /**
   * The function `ensurePostExists` checks if a post with a specific ID exists in the database and
   * throws a `NotFoundException` if it does not.
   * @param {string} id - The `id` parameter in the `ensurePostExists` function is a string that
   * represents the unique identifier of a post. This function is responsible for checking if a post with
   * the given `id` exists in the database using the Prisma service. If the post does not exist, it
   * throws a
   */
  private async ensurePostExists(id: string) {
    const exists = await this.prismaService.post.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Post ${id} not found`);
  }

  /**
   * The function `validateTags` checks if the provided tag IDs are valid and returns an array of valid
   * tag IDs.
   * @param {string[]} [tagIds] - The `validateTags` function is used to validate an array of tag IDs.
   * If the `tagIds` parameter is not provided or is an empty array, the function will return an empty
   * array. Otherwise, it will query the database to find tags with the provided IDs. If all the tag
   * IDs
   * @returns The `validateTags` function returns a Promise that resolves to an array of valid tag IDs.
   * If the `tagIds` parameter is not provided or is an empty array, the function returns an empty
   * array. Otherwise, it queries the database to find tags with the provided IDs, checks if all
   * provided tag IDs are valid, and then returns an array of valid tag IDs. If any of the provided
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
