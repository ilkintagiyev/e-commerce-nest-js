import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UsersModule } from 'src/users/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Cart]), UsersModule],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule { }
