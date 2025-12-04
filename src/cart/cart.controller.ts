import { Controller, Get, Post, Body, Param, Patch, Delete, Headers } from '@nestjs/common';
import { CartService } from './cart.service';
import { UserService } from 'src/users/users.service';

@Controller('carts')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        private readonly userService: UserService
    ) { }


    @Get()
    async getUserCart(@Headers('authorization') authHeader: string, @Param('userId') userId: number) {
        const user = await this.userService.verifyToken(authHeader);
        return this.cartService.findByUser(user?.id);
    }

    @Post()
    async addToCart(@Headers('authorization') authHeader: string, @Body() body: { product_id: number; quantity: number }) {
        const user = await this.userService.verifyToken(authHeader);
        return this.cartService.addCart(user?.id, body.product_id, body.quantity);
    }

    @Patch(':id')
    updateCart(@Param('id') id: number, @Body() body: { quantity: number }) {
        return this.cartService.updateQuantity(id, body.quantity);
    }

    @Delete(':id')
    removeCart(@Param('id') id: number) {
        return this.cartService.removeCart(id);
    }
}
