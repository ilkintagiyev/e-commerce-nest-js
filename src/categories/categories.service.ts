import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { MainCategory } from '../main-categories/main-category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(MainCategory)
    private readonly mainCategoryRepo: Repository<MainCategory>,
  ) { }


  async findByMainCategory(mainCategoryId: number) {
    return this.categoryRepo.find({
      where: { mainCategory: { id: mainCategoryId } },
      relations: ['mainCategory', 'products'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['mainCategory', 'products'],
    });
    if (!category) throw new NotFoundException('Kateqoriya tapılmadı');
    return category;
  }

  async create(data: { name: string; mainCategoryId: number }) {
    const mainCategory = await this.mainCategoryRepo.findOne({
      where: { id: data.mainCategoryId },
    });

    if (!mainCategory)
      throw new NotFoundException('Əlaqəli əsas kateqoriya tapılmadı');

    const newCategory = this.categoryRepo.create({
      name: data.name,
      mainCategory,
    });

    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, data: Partial<Category>) {
    const category = await this.findOne(id);
    Object.assign(category, data);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepo.remove(category);
  }
}
