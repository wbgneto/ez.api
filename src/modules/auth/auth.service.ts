import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    /**
     * @param user
     */
    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({id: user.id}),
            user: user
        };
    }
}