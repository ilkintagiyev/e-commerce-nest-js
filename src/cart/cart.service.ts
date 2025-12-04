import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) { }

    findAll() {
        return this.cartRepository.find();
    }

    findByUser(userId: number) {
        return this.cartRepository
            .createQueryBuilder('cart')
            .leftJoinAndSelect('cart.product', 'product')
            .where('cart.user_id = :userId', { userId })
            .getMany();
    }

    async addCart(userId: number, productId: number, quantity: number) {
        const existing = await this.cartRepository.findOne({
            where: { user_id: userId, product_id: productId },
        });

        if (existing) {
            await this.cartRepository.remove(existing);
            return {
                status: 200,
                message: 'Məhsul səbətdən silindi.',
                data: null,
            };
        }

        const cart = this.cartRepository.create({ user_id: userId, product_id: productId, quantity });
        const saved = await this.cartRepository.save(cart);

        return {
            status: 200,
            message: 'Məhsul səbətə əlavə olundu.',
            data: saved,
        };
    }

    async updateQuantity(cartId: number, quantity: number) {
        await this.cartRepository.update(cartId, { quantity });
        return this.cartRepository.findOneBy({ id: cartId });
    }

    async removeCart(cartId: number) {
        return this.cartRepository.delete(cartId);
    }
}
