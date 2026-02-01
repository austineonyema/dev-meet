import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * The function creates a new user in a database after checking if a user with the same email already
   * exists.
   * @param {CreateUserDto} createUserDto - The `createUserDto` parameter is an object that contains
   * the data needed to create a new user. It typically includes properties like `email`, `password`,
   * `name`, and `role`. This data is used to create a new user in the database after checking if a
   * user with the same email
   * @returns The `create` function returns a Promise that resolves to a `User` object. The `User`
   * object contains the following fields: id, email, name, role, createdAt, and updatedAt. The
   * password field is explicitly excluded from the returned data.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hash = await bcrypt.hash(createUserDto.password, 10);
    // Create user in database
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hash,
      },
      select: {
        // Only return these fields (don't expose password!)
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // password: false  // Explicitly exclude password
      },
    });

    return user;
  }

  /**
   * The `findAll` function retrieves all users from the database with selected fields using Prisma in
   * TypeScript.
   * @returns The `findAll` function returns a Promise that resolves to an array of User objects. Each
   * User object contains the properties `id`, `email`, `name`, `role`, `createdAt`, and `updatedAt`.
   */
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  /**
   * The `findOne` function in TypeScript asynchronously retrieves a user by their ID.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * user.
   * @returns The `findOne` function is returning a Promise that resolves to a `User` object fetched
   * using the `getUser` function with the provided `id`.
   */
  async findOne(id: string): Promise<User> {
    return this.getUser(id);
  }

  /**
   * This TypeScript function updates a user's information, including hashing the password if provided,
   * and returns the updated user object.
   * @param {string} id - The `id` parameter in the `update` function is a string that represents the
   * unique identifier of the user you want to update in the database. It is used to locate the
   * specific user record that needs to be updated.
   * @param {UpdateUserDto} updateUserDto - The `updateUserDto` parameter is an object that contains
   * the data to update for a user. It typically includes properties like `email`, `name`, `role`, and
   * `password`. In the `update` method you provided, it checks if the `updateUserDto` contains a
   * `password
   * @returns The `update` method is returning a Promise that resolves to a `User` object. The `User`
   * object contains the updated user information such as id, email, name, role, createdAt, and
   * updatedAt.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.getId(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  /**
   * The `remove` function asynchronously removes a user with the specified ID from the database using
   * Prisma.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * user that you want to remove from the database.
   * @returns The `remove` function is returning a Promise that resolves to `void`.
   */
  async remove(id: string): Promise<void> {
    await this.getId(id);
    await this.prisma.user.delete({
      where: { id },
    });
    return;
  }

  /**
   * This function retrieves a user with their posts based on the provided ID asynchronously.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * user. It is used to fetch a user from the database along with their associated posts.
   * @returns The `getWithPosts` function returns a Promise that resolves to a `User` object with the
   * specified properties (id, email, name, role, createdAt, updatedAt, posts). If the user with the
   * provided `id` is not found, a `NotFoundException` is thrown with a message indicating that the
   * user was not found.
   */
  async getWithPosts(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        posts: true,
        // password omitted
      },
    });
    if (!user) throw new NotFoundException(`User with id: ${id} Not Found`);
    return user;
  }

  // ----------- internals -------------------
  /**
   * This TypeScript function checks if a user with a specific ID exists in the database and throws an
   * exception if not found.
   * @param {string} id - The `id` parameter is a string representing the unique identifier of a user.
   * @returns The `getId` function is returning a Promise that resolves to a boolean value. The boolean
   * value indicates whether a user with the provided `id` exists in the database. If the user does not
   * exist, a `NotFoundException` is thrown with a message indicating that the user was not found.
   */
  private async getId(id: string): Promise<boolean> {
    const userExists = (await this.prisma.user.count({ where: { id: id } })) > 0;

    if (!userExists) throw new NotFoundException(`User with id: ${id} Not Found`);
    return userExists;
  }

  /**
   * This TypeScript function retrieves a user by their ID from a database using Prisma and returns the
   * user object if found, otherwise throws a NotFoundException.
   * @param {string} id - The `id` parameter in the `getUser` function is a string that represents the
   * unique identifier of the user whose information is being retrieved.
   * @returns The `getUser` function returns a Promise that resolves to a `User` object with the
   * specified properties (id, email, name, role, createdAt, updatedAt) if the user is found in the
   * database. If the user is not found, a `NotFoundException` is thrown with a message indicating that
   * the user with the specified id was not found.
   */
  private async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException(`User with id: ${id} Not Found`);
    return user;
  }

  /**
   * This TypeScript function asynchronously finds a user by their email address and includes the
   * password for login verification.
   * @param {string} email - The `findByEmail` function is an asynchronous function that takes an
   * `email` parameter of type string. It queries the database using Prisma to find a user with the
   * specified email address. If the user is found, it returns the user object. If the user is not
   * found, it throws an
   * @returns The `findByEmail` function is returning a `Promise` that resolves to a `User` object. The
   * function first queries the database using Prisma to find a user with the specified email address.
   * If a user is found, the function returns the user object. If no user is found, it throws an
   * `UnauthorizedException` with the message 'Invalid credentials'.
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      // Include password here (needed for login verification)
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
      // Generic message (don't reveal if email exists for security)
    }
    return user;
  }
}
