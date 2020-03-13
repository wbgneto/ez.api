import * as crypto from 'crypto';
import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {SignUpDto} from "../auth/data/signUp.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * @param id
     */
    async get(id: number) {
        return this.userRepository.findOne(id);
    }

    /**
     * @param email
     */
    async getByEmail(email: string) {
        return await this.userRepository.createQueryBuilder('users')
            .where('users.email = :email')
            .setParameter('email', email)
            .getOne();
    }

    /**
     * @param email
     * @param password
     */
    async getByEmailAndPass(email: string, password: string) {
        const passHash = crypto.createHmac('sha256', password).digest('hex');

        return await this.userRepository.createQueryBuilder('users')
            .where('users.email = :email and users.password = :password')
            .setParameter('email', email)
            .setParameter('password', passHash)
            .getOne();
    }

    /**
     * @param payload
     */
    async create(payload: SignUpDto)
    {
        const user = await this.getByEmail(payload.email);

        if (user) {
            throw new BadRequestException('User with provided email already created.');
        }

        return await this.userRepository.save(
            this.userRepository.create(payload),
        );
    }
}