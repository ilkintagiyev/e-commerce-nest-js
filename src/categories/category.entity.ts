import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MainCategory } from '../main-categories/main-category.entity';
import { Product } from 'src/products/products.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @ManyToOne(() => MainCategory, (mainCategory) => mainCategory.categories, {
        onDelete: 'CASCADE',
    })
    mainCategory: MainCategory;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
