import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
  ) {}

  // REGISTER: Create account
  async register(registerDto: RegisterDTO) {
    // Create user (UsersService handles hashing and validation)
    const user = await this.user.create(registerDto);
    // Generate JWT token
    const token = this.generateToken(user.id, user.email, user.role);
    return {
      ...user, // User data (without password)
      access_token: token, // JWT token
    };
  }

  // LOGIN: Verify credentials
  async login(loginDto: LoginDto) {
    // Step 1: Find user by email
    const user = await this.user.findByEmail(loginDto.email);
    // Step 2: Verify password
    await this.validatePassword(loginDto.password, user.password);
    // Step 3: Generate JWT token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        // No password!
      },
      access_token: token,
    };
  }

  // VALIDATE: Check if token is valid
  validateUser(userId: string) {
    // Called by JWT strategy on every protected request
    return this.user.findOne(userId);
  }

  private async validatePassword(plain: string, hashed: string) {
    const isPasswordValid = await bcrypt.compare(
      plain, // Plain password from request
      hashed, // Hashed password from database
    );

    if (!isPasswordValid) {
      // Wrong password
      throw new UnauthorizedException('Invalid credentials');
    }
    return isPasswordValid;
  }

  // PRIVATE: Generate JWT token
  private generateToken(userId: string, email: string, role: Role): string {
    // Payload (data stored in token)
    const payload = {
      sub: userId, // "sub" is JWT standard for user ID it refers to the subscriber
      email: email, // Include email for convenience
      role: role,
    };

    // Sign and return token
    return this.jwt.sign(payload);
    // Token expires in 7 days (set in module config)
  }
}
