import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll(@Query('mainCategoryId') mainCategoryId?: string) {
        return this.productsService.findAll(mainCategoryId ? +mainCategoryId : undefined);
    }

    @Get('discounted')
    findDiscounted() {
        return this.productsService.findDiscounted();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Post()
    create(
        @Body()
        body: {
            name: string;
            description?: string;
            price: number;
            stock: number;
            categoryId: number;
            discountPrice?: number;
        },
    ) {
        return this.productsService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.productsService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }
}
