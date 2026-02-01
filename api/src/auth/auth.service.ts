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

  /**
   * The `register` function creates a new user, generates a JWT token, and returns the user data
   * without the password along with the token.
   * @param {RegisterDTO} registerDto - The `registerDto` parameter in the `register` function likely
   * contains the data needed to register a new user. This data could include information such as the
   * user's email, password, name, and any other required details for creating a new user account. The
   * `RegisterDTO` type likely defines the
   * @returns The `register` function is returning an object that includes the user data (excluding the
   * password) and an access token (JWT token).
   */
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

  /**
   * The `login` function in TypeScript asynchronously handles user authentication by finding the user
   * by email, verifying the password, generating a JWT token, and returning user information without
   * the password along with the access token.
   * @param {LoginDto} loginDto - The `loginDto` parameter in the `async login` function likely
   * represents an object containing the data needed for user authentication. It may include properties
   * such as `email` and `password`, which are used to authenticate the user during the login process.
   * @returns The `login` function returns an object with two properties:
   * 1. `user`: An object containing the user's `id`, `email`, `name`, and `role` properties. The
   * `password` property is intentionally excluded.
   * 2. `access_token`: A JWT token generated for the user.
   */
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

  /**
   * The function `validateUser` retrieves a user record based on the provided user ID.
   * @param {string} userId - The `userId` parameter in the `validateUser` function is a string that
   * represents the unique identifier of a user. This function is typically called by a JWT (JSON Web
   * Token) strategy on every protected request to validate and retrieve user information based on the
   * provided `userId`.
   * @returns The `findOne` method of the `user` object is being called with the `userId` parameter
   * passed to it, and the result of this method call is being returned.
   */
  validateUser(userId: string) {
    // Called by JWT strategy on every protected request
    return this.user.findOne(userId);
  }

  /**
   * The function `validatePassword` compares a plain password with a hashed password and throws an
   * exception if they do not match.
   * @param {string} plain - The `plain` parameter in the `validatePassword` function represents the
   * plain text password that is provided by the user during authentication. This plain text password
   * needs to be compared with the hashed password stored in the database to validate the user's
   * credentials.
   * @param {string} hashed - The `hashed` parameter in the `validatePassword` function represents the
   * hashed password stored in the database. When a user tries to log in, their input password is
   * compared with this hashed password to verify their identity.
   * @returns The `validatePassword` function is returning a boolean value `isPasswordValid`, which
   * indicates whether the plain password provided matches the hashed password stored in the database.
   * If the passwords match, it returns `true`, otherwise it throws an `UnauthorizedException` with the
   * message 'Invalid credentials' and returns `false`.
   */
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

  /**
   * The function generates a token containing user ID, email, and role information using JWT in
   * TypeScript.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
   * of a user. It is used to identify the user for whom the token is being generated.
   * @param {string} email - The `email` parameter in the `generateToken` function is a string that
   * represents the email address of the user for whom the token is being generated.
   * @param {Role} role - The `role` parameter in the `generateToken` function represents the role of
   * the user for whom the token is being generated. It is used to include the user's role information
   * in the token payload for authorization and access control purposes. The `role` parameter is of
   * type `Role`, which likely
   * @returns A JWT token is being returned from the `generateToken` function.
   */
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
