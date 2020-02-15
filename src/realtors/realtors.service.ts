import { Injectable, NotFoundException } from '@nestjs/common';
import { api_realtor  } from './realtor.entity';
import { IDGenerator } from '../config/IDGenetaror';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RealtorsService {
    constructor(
        @InjectRepository(api_realtor )
        private readonly realtorRepository: Repository<api_realtor>,
    ) {}

    // private realtors: Realtor[] = [];
    
    insertRealtor(firstName: string, lastName: string, phone: string, addressId: number) {
        var generator = new IDGenerator();
        const newId = generator.generate();
        const today = new Date();
        // const newRealtor = new Realtor(newId, firstName, lastName, phone, addressId, today);
        // Insert the new realtor to the database and return the generated id to the user
        // this.realtors.push(newRealtor);
        return newId;
    }

    getRealtors(): Promise<api_realtor[]> {
         return this.realtorRepository.find();
    }

    getSingleRealtor(realtorId: number) {
        // const realtor = this.findRealtor(realtorId);
        // return { ...realtor };
    }

    updateRealtor(realtorId: number, firstName: string, lastName: string, phone: string, addressId: number) {
        const realtor = this.findRealtor(realtorId);

    }

    deleteRealtor(realtorId: number) {
        const realtor = this.findRealtor(realtorId);
    }

    private findRealtor(id: number) {
        // const realtor = this.realtors.find(e => e.id === id);
        // if( !realtor ) {
        //     throw new NotFoundException('Could not find Realtor!');
        // }
        // return realtor;
    }
}