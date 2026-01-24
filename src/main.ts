import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      // Example: If DTO has {email, name} but request has {email, name, hack}
      // → 'hack' is automatically removed

      forbidNonWhitelisted: true, // Throw error if unknown properties exist
      // Instead of silently removing, reject the request

      transform: true, // Auto-transform payloads to DTO instances
      // Converts plain JavaScript objects to class instances
    }),
  );

  // Set global prefix (all routes start with /api/v1)
  app.setGlobalPrefix('api/v1');
  // Now routes are: /api/v1/users, /api/v1/auth, etc

  await app.listen(3000);
}
bootstrap();
