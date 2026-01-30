import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
//import { CacheModule } from '@nestjs/cache-manager';
import ms from 'ms';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './roles.guard';
@Module({
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expires = config.get<string>('JWT_EXPIRES_IN') ?? '50m';

        if (!secret) throw new Error('JWT_SECRET missing');

        return {
          secret,
          signOptions: {
            expiresIn: expires as ms.StringValue,
          },
        };
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthModule {}
//608400
//CacheModule.register({ ttl: 300 }),
//best to generate with openssl rand -base64 32
