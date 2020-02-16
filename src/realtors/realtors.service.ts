import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { api_realtor  } from './realtor.entity';
// import { IDGenerator } from '../config/IDGenetaror';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RealtorsService {
    constructor(
        @InjectRepository(api_realtor )
        private realtorRepository: Repository<api_realtor>,
    ) {}

    
    async insertRealtor(firstName: string, lastName: string, phone: string, addressId: number) {
        const today = new Date();
        let realtor = new api_realtor();
        realtor.addr_id = addressId;
        realtor.firstname = firstName;
        realtor.lastname = lastName;
        realtor.phone = phone;
        realtor.created_at = today;

        await this.realtorRepository.save(realtor);
    }

    async getRealtors(): Promise<api_realtor[]> {
         return await this.realtorRepository.find();
    }

    async getSingleRealtor(realtorId: number): Promise<api_realtor> {
        return await this.findRealtor(realtorId);
    }

    async updateRealtor(realtorId: number, firstName: string, lastName: string, phone: string, addressId: number) {
        const realtorToUpdate = await this.findRealtor(realtorId);
        if(firstName) {
            realtorToUpdate.firstname = firstName;
        }
        if(lastName) {
            realtorToUpdate.lastname = lastName;
        }
        if(phone) {
            realtorToUpdate.phone = phone;
        }
        if(addressId) {
            realtorToUpdate.addr_id = addressId;
        }
        await this.realtorRepository.update(realtorToUpdate.id, realtorToUpdate);
        return realtorToUpdate;
    }

    async deleteRealtor(realtorId: number) {
        const realtorToDelete = await this.findRealtor(realtorId);
        await this.realtorRepository.remove(realtorToDelete);
    }

    private async findRealtor(realtorId: number): Promise<api_realtor> {
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