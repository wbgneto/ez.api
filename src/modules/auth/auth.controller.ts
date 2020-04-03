import {Controller, Body, Post, UseGuards, Get, Request, BadRequestException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {JwtAuthGuard} from "./jwt.guard";
import {SignUpDto} from "./data/signUp.dto";
import {ValidationError} from "class-validator";
import {LoginDto} from "./data/login.dto";

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService,
  ) { }

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<any> {
    const user = await this.usersService.getByEmailAndPass(payload.email, payload.password);

    if (user === undefined) {
      throw new BadRequestException("Invalid credentials");
    }

    const data = await this.authService.createToken(user);

    return {
      status_code: 200,
      message: `Authenticated as ${data.user.name}, welcome!`,
      data
    };
  }

  @Post('signup')
  async signup(@Body() payload: SignUpDto): Promise<any> {
    const user = await this.usersService.create(payload);
    return await this.authService.createToken(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getLoggedInUser(@Request() request): Promise<any> {
    return request.user;
  }
}