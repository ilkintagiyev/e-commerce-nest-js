import { Controller, Get, Post, Body } from '@nestjs/common';
import { MainCategoriesService } from './main-categories.service';

@Controller('main-categories')
export class MainCategoriesController {
    constructor(private readonly mainCategoriesService: MainCategoriesService) { }

    @Get()
    getAll() {
        return this.mainCategoriesService.findAll();
    }

    @Post()
    create(@Body() body: any) {
        return this.mainCategoriesService.create(body);
    }
}
