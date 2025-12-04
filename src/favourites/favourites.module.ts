// src/favourites/favourites.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { Favourite } from './favourite.entity';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite]), UsersModule],
  providers: [FavouritesService],
  controllers: [FavouritesController],
})
export class FavouritesModule {}
