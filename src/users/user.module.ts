import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'SECRET_KEY',
    signOptions: { expiresIn: '1d' },
  }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule { }
