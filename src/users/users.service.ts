import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    private generateToken(user: User) {
        const payload = { id: user.id, email: user.email };
        return this.jwtService.sign(payload);
    }

    async register(data: { name: string; email: string; password: string }) {
        const { name, email, password } = data;

        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing) {
            throw new HttpException(
                'Bu email ilə artıq qeydiyyatdan keçilib',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepo.create({
            name: name[0].toUpperCase() + name.slice(1).toLowerCase(),
            email,
            password: hashedPassword,
        });

        await this.userRepo.save(user);


        return {
            message: 'User created',
            user: { id: user.id, name: user.name, email: user.email },
        };
    }

    async login(data: { email: string; password: string }) {
        const { email, password } = data;

        if (!email) {
            throw new HttpException('Email daxil edilməyib', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('Belə istifadəçi tapılmadı', HttpStatus.NOT_FOUND);
        }

        if (!password) {
            throw new HttpException('Şifrə daxil edilməyib', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new HttpException('Səhv paroldu', HttpStatus.UNAUTHORIZED);
        }

        const token = this.generateToken(user);

        return {
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }, // optional, frontend üçün
        };
    }

    async verifyToken(authHeader: string) {
        try {
            if (!authHeader) throw new Error('Token yoxdur');

            const token = authHeader.split(' ')[1];
            const decoded = this.jwtService.decode(token) as { id: number; email: string };

            if (!decoded?.id) throw new Error('Token etibarsızdır');

            const user = await this.userRepo.findOne({ where: { id: decoded.id } });
            if (!user) throw new Error('İstifadəçi tapılmadı');

            return user;
        } catch (err) {
            throw new Error('Token yoxlanılmadı: ' + err.message);
        }
    }

    async getUserById(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('İstifadəçi tapılmadı');
        }

        const { password, ...result } = user;
        return result;

    }
}
