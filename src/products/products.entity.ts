import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { ProductVariant } from 'src/product-variant/product-variant.entity';
import { ProductImage } from 'src/product-image/product-image.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    image: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    discountPrice: number;

    @Column({ default: 0 })
    stock: number;

    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: 'SET NULL',
    })
    category: Category;

    @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
    variants: ProductVariant[];


    @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
    images: ProductImage[];

}
