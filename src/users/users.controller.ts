import { Controller, Post, Body, Get, Headers, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/utils/authguard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() body: User) {
        return this.userService.register(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.userService.login(body);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Request() req) {
        return this.userService.getUserById(req.user.id);
    }

    @Get(':id')
    async getUserById(@Headers('authorization') auth: string, @Param('id') id: number) {
        await this.userService.verifyToken(auth);
        return this.userService.getUserById(id);
    }
}
