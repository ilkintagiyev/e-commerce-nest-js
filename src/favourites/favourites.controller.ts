import { Controller, Post, Get, Delete, Param, Body, Headers } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { UserService } from '../users/users.service';

@Controller('favourites')
export class FavouritesController {
    constructor(
        private readonly favouritesService: FavouritesService,
        private readonly userService: UserService
    ) { }

    @Post()
    async addFavourite(
        @Body() body: { product_id: number },
        @Headers('authorization') authHeader: string
    ) {
        const user = await this.userService.verifyToken(authHeader);

        return this.favouritesService.create(user.id, body.product_id);
    }

    @Get()
    async getUserFavourites(@Headers('authorization') authHeader: string) {
        const user = await this.userService.verifyToken(authHeader);
        return this.favouritesService.findAllByUser(user.id);
    }

    @Delete(':id')
    async removeFavourite(
        @Param('id') id: number,
        @Headers('authorization') authHeader: string
    ) {
        const user = await this.userService.verifyToken(authHeader);

        return this.favouritesService.remove(id);
    }
}
