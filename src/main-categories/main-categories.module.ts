import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './main-category.entity';
import { MainCategoriesService } from './main-categories.service';
import { MainCategoriesController } from './main-categories.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MainCategory])],
    controllers: [MainCategoriesController],
    providers: [MainCategoriesService],
})
export class MainCategoriesModule { }
