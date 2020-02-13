import { Injectable, NotFoundException } from '@nestjs/common';
import { Realtor } from './realtor.model';
import { IDGenerator } from '../config/IDGenetaror';

@Injectable()
export class RealtorsService {
    private realtors: Realtor[] = [];
    
    insertRealtor(firstName: string, lastName: string, phone: string, addressId: number) {
        var generator = new IDGenerator();
        const newId = generator.generate();
        const today = new Date();
        const newRealtor = new Realtor(newId, firstName, lastName, phone, addressId, today);
        // Insert the new realtor to the database and return the generated id to the user
        this.realtors.push(newRealtor);
        return newId;
    }

    getRealtors() {

    }

    getSingleRealtor(realtorId: number) {
        const realtor = this.findRealtor(realtorId);
        return { ...realtor };
    }

    updateRealtor(realtorId: number, firstName: string, lastName: string, phone: string, addressId: number) {
        const realtor = this.findRealtor(realtorId);

    }

    deleteRealtor(realtorId: number) {
        const realtor = this.findRealtor(realtorId);
    }

    private findRealtor(id: number) {
        const realtor = this.realtors.find(e => e.id === id);
        if( !realtor ) {
            throw new NotFoundException('Could not find Realtor!');
        }
        return realtor;
    }
}