import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../types/jwt-payload';
//import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    //@Inject(CACHE_MANAGER) private cache: Cache,
  ) {
    super({
      //where to find the token in the request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Looks for: Authorization: Bearer <Token>
      ignoreExpiration: false, // Reject expired tokens

      secretOrKey: process.env.JWT_SECRET, //secret  key from .env
    });
  }
  //This runs after token has been verified
  async validate(payload: JwtPayload) {
    // const cached = await this.cache.get(payload.sub);
    //if (cached) return cached;
    //payload.sub = user subscriber ID (from generateToken )
    const user = await this.authService.validateUser(payload.sub);
    //user doesn't exist (deleted or hidden)
    if (!user) throw new UnauthorizedException();
    //return value gets attached to request.user
    //await this.cache.set(payload.sub, user, 300);
    return {
      userId: user.id,
      role: user.role,
    };
  }
}
