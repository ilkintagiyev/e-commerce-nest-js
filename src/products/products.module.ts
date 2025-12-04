import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Category } from '../categories/category.entity';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { ProductImage } from 'src/product-image/product-image.entity';
import { ProductVariant } from 'src/product-variant/product-variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductImage, ProductVariant])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
