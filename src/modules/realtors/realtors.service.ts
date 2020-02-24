import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Realtor  } from './realtor.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RealtorsService {
    constructor(
        @InjectRepository(Realtor )
        private realtorRepository: Repository<Realtor>,
    ) {}

    
    async insertRealtor(firstName: string, lastName: string, phone: string, addressId: number) {
        const today = new Date();
        let realtor = new Realtor();
        realtor.address_id = addressId;
        realtor.first_name = firstName;
        realtor.last_name = lastName;
        realtor.phone = phone;
        realtor.created_at = today;
        await this.realtorRepository.save(realtor);
        
    }

    async getRealtors(): Promise<Realtor[]> {
         return await this.realtorRepository.find();
    }

    async getSingleRealtor(realtorId: number): Promise<Realtor> {
        return await this.findRealtor(realtorId);
    }

    async updateRealtor(realtorId: number, firstName: string, lastName: string, phone: string, addressId: number) {
        const realtorToUpdate = await this.findRealtor(realtorId);
        if(firstName) {
            realtorToUpdate.first_name = firstName;
        }
        if(lastName) {
            realtorToUpdate.last_name = lastName;
        }
        if(phone) {
            realtorToUpdate.phone = phone;
        }
        if(addressId) {
            realtorToUpdate.address_id = addressId;
        }
        await this.realtorRepository.update(realtorToUpdate.id, realtorToUpdate);
        return realtorToUpdate;
    }

    async deleteRealtor(realtorId: number) {
        const realtorToDelete = await this.findRealtor(realtorId);
        await this.realtorRepository.remove(realtorToDelete);
    }

    private async findRealtor(realtorId: number): Promise<Realtor> {
        let realtor;
        try {
            realtor = await this.realtorRepository.findOne(realtorId);
        } catch (error) {
            throw new NotFoundException('Could not find the Realtor!');
        }
        if( !realtor) {
            throw new NotFoundException('The Realtor does not exist!');
        }
        return realtor;
    }
}