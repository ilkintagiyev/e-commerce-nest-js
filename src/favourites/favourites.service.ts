// src/favourites/favourites.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './favourite.entity';

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(Favourite)
        private favouritesRepository: Repository<Favourite>,
    ) { }

    async create(user_id: number, product_id: number): Promise<any> {
        const existing = await this.favouritesRepository.findOne({
            where: { user_id, product_id },
        });

        if (existing) {
            await this.favouritesRepository.remove(existing);
            return {
                status: 200,
                message: 'Məhsul favoritlərdən silindi.',
                data: null,
            };
        }

        const favourite = this.favouritesRepository.create({ user_id, product_id });
        const saved = await this.favouritesRepository.save(favourite);

        return {
            status: 200,
            message: 'Məhsul favoritlərə əlavə olundu.',
            data: saved,
        };
    }

    async findAllByUser(user_id: number): Promise<Favourite[]> {
        return this.favouritesRepository
            .createQueryBuilder('favourite')
            .leftJoinAndSelect('favourite.product', 'product') 
            .where('favourite.user_id = :user_id', { user_id })
            .getMany();
    }

    async remove(id: number): Promise<void> {
        await this.favouritesRepository.delete(id);
    }
}
