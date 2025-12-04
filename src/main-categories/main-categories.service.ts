import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './main-category.entity';

@Injectable()
export class MainCategoriesService {
  constructor(
    @InjectRepository(MainCategory)
    private mainCategoryRepo: Repository<MainCategory>,
  ) {}

  findAll() {
    return this.mainCategoryRepo.find({ relations: ['categories'] });
  }

  create(data: Partial<MainCategory>) {
    return this.mainCategoryRepo.save(data);
  }
}
