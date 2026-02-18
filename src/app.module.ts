import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategoriesModule } from './main-categories/main-categories.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { MainCategory } from './main-categories/main-category.entity';
import { Category } from './categories/category.entity';
import { Product } from './products/products.entity';
import { UsersModule } from './users/user.module';
import { User } from './users/users.entity';
import { FavouritesModule } from './favourites/favourites.module';
import { Favourite } from './favourites/favourite.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { ProductVariant } from './product-variant/product-variant.entity';
import { ProductImage } from './product-image/product-image.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ballast.proxy.rlwy.net',
      port: 11937,
      username: 'root',
      password: 'VGMDVNVKwUOlLhoYBruAGTMheqgxPteB',
      database: 'railway',
      entities: [
        MainCategory,
        Category,
        Product,
        User,
        Favourite,
        Cart,
        ProductVariant,
        ProductImage,
      ],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    MainCategoriesModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    FavouritesModule,
    CartModule
  ],
})
export class AppModule { }
