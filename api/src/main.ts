import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

function getAllowedOrigins(): string[] {
  const configuredOrigins = process.env.FRONTEND_ORIGIN;

  if (!configuredOrigins) {
    return ['http://localhost:6173'];
  }

  return configuredOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalGuards(app.get(Reflector));
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: getAllowedOrigins(),
    credentials: true,
  });

  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port, '0.0.0.0');
}
bootstrap();