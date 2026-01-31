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

  async findOne(id: string): Promise<User> {
    return this.getUser(id);
  }

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

  async remove(id: string): Promise<void> {
    await this.getId(id);
    await this.prisma.user.delete({
      where: { id },
    });
    return;
  }
  // ----------- internals -------------------
  private async getId(id: string): Promise<boolean> {
    const userExists = (await this.prisma.user.count({ where: { id: id } })) > 0;

    if (!userExists) throw new NotFoundException(`User with id: ${id} Not Found`);
    return userExists;
  }

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
