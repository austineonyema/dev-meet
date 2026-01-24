import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    super({ adapter: pool });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Helper method for database transactions
  // (multiple operations that all succeed or all fail together)
  // async executeTransaction<T>(
  //   fn: (prisma: PrismaClient) => Promise<T>
  // ): Promise<T> {
  //   return this.$transaction(fn);  // Prisma handles transaction
  // }
}
