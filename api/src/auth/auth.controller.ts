import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from 'src/commons/decorators/current-user';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from './roles.guard';
import type { AuthUser } from './types/auth-request';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  login(@Body() loginDTO: LoginDto) {
    return this.authService.login(loginDTO);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  getProfile(@CurrentUser() user: AuthUser) {
    //// @CurrentUSer() automatically gives us the loggedin user
    return user;
  }
}
