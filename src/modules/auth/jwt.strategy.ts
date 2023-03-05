import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: any, done) {
        try {
            const timeDiff = payload?.exp - payload?.iat;
            if (timeDiff <= 0) {
                throw new UnauthorizedException();
            }
            const user = await this.authService.validateUser(payload?.id);
            if (!user) {
                throw new UnauthorizedException();
            }
            done(null, user);
        } catch (error) {
            throw new UnauthorizedException();
        }
        // return { userId: payload.sub, username: payload.username };
    }
}

