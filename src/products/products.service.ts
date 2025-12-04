import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) { }

  async findAll(mainCategoryId?: number) {
    if (mainCategoryId) {
      return this.productRepo.find({
        where: {
          category: {
            mainCategory: {
              id: mainCategoryId,
            },
          },
        },
        relations: ['category', 'category.mainCategory'],
      });
    }

    return this.productRepo.find({
      relations: ['category', 'category.mainCategory'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: [
        'category',
        'category.mainCategory',
        'variants',
        'images',
      ],
    });

    if (!product) {
      throw new NotFoundException('Məhsul tapılmadı');
    }

    return product;
  }

  async create(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: number;
    discountPrice?: number;
  }) {
    const category = await this.categoryRepo.findOne({
      where: { id: data.categoryId },
    });

    if (!category) throw new NotFoundException('Kateqoriya tapılmadı');

    // const product = this.productRepo.create({
    //   name: data.name,
    //   description: data.description,
    //   price: data.price,
    //   stock: data.stock,
    //   category,
    //   discountPrice: data.discountPrice || null,
    // });

    // return this.productRepo.save(product);
  }

  async findDiscounted() {
    return this.productRepo.find({
      where: {
        discountPrice: Not(IsNull()) && MoreThan(0),
      },
      relations: ['category', 'category.mainCategory'],
    });
  }

  async update(id: number, data: Partial<Product>) {
    const product = await this.findOne(id);
    Object.assign(product, data);

    if (data.discountPrice !== undefined) {
      product.discountPrice = data.discountPrice;
    }

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
