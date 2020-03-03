import { Controller, Post, Body, Get, Param, Put, Delete, Logger, NotFoundException } from "@nestjs/common";
import { RealtorsService } from "./realtors.service";
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm";
import { Realtor  } from './realtor.entity';

@Controller('realtors')
export class RealtorsController {
    constructor(
        private realtorsService: RealtorsService,
        @InjectRepository(Realtor)
        private realtorRepository: Repository<Realtor>,
        ) {}


    @Post()
    create(
        @Body('firstName') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string
    ) {
        const toValidate = {firstName: realtorFirstName, lastName: realtorLastName, phone: realtorPhone};
        validate('RealtorSchema', toValidate).then(errors => {
            if(errors.length > 0) {
                Logger.log("Validation failed: " + errors);
            } else {
                Logger.log("validation succeed ");
                const today = new Date();
                let realtor = new Realtor();
                realtor.first_name = realtorFirstName;
                realtor.last_name = realtorLastName;
                realtor.phone = realtorPhone;
                realtor.created_at = today;
                this.realtorRepository.save(realtor);
                // this.realtorsService.insertRealtor(realtorFirstName, realtorLastName, realtorPhone);
            }
        }).catch(errors => {
            throw errors;
        });
    }

    @Get()
    async getAll() {
        return await this.realtorRepository.find();
        // return this.realtorsService.getRealtors();
    }

    @Get(':id')
    async find(@Param('id') realtorId: number) {
        return await this.findRealtor(realtorId);
        // return this.realtorsService.getSingleRealtor(realtorId);
    }

    @Put(':id')
    async update(
        @Param('id') realtorId: number, 
        @Body('firstName') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string
        ) {
            const toValidate = {firstname: realtorFirstName, lastname: realtorLastName, phone: realtorPhone};
            validate('RealtorSchema', toValidate).then( async errors => {
                if(errors.length > 0) {
                    Logger.log("Validation failed: " + errors);
                } else {
                    Logger.log("validation succeed ");
                    return this.updateRealtor(realtorId, realtorFirstName, realtorLastName, realtorPhone );
                }
            }).catch(errors => {
                throw errors;
            });
    }

    @Delete(':id')
    async remove(@Param('id') realtorId: number) {
        const realtorToDelete = await this.findRealtor(realtorId);
        await this.realtorRepository.remove(realtorToDelete);
        // this.realtorsService.deleteRealtor(realtorId);
        return null;
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

    async updateRealtor(realtorId: number, firstName: string, lastName: string, phone: string) {
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
        await this.realtorRepository.update(realtorToUpdate.id, realtorToUpdate);
        return realtorToUpdate;
    }
}