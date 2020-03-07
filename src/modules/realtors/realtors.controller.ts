import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from "typeorm";
import {Realtor} from './realtor.entity';
import {CreateRealtorDto} from "./data/createRealtor.dto";
import {UpdateRealtorDto} from "./data/updateRealtor.dto";

@Controller('realtors')
export class RealtorsController {
    constructor(
        @InjectRepository(Realtor)
        private realtorRepository: Repository<Realtor>,
    ) {
    }

    @Get()
    async getAll(@Query() query) {
        const where:any = {};

        if (query.name) {
            where.name = Like(`%${query.name}%`);
        }

        const realtors = await this.realtorRepository.find({ where });

        return {
            status_code: 200,
            message: "Realtors fetched successfully",
            data: realtors
        };
    }

    @Get(':id')
    async find(@Param('id') realtorId: number) {
        const realtor = await this.realtorRepository.findOne(realtorId);

        if (realtor === undefined) {
            throw new NotFoundException();
        }

        return {
            status_code: 200,
            message: 'Realtor found',
            data: realtor,
        };
    }

    @Post()
    async create(@Body() requestData: CreateRealtorDto) {
        const realtor = await this.realtorRepository.save(requestData);

        return {
            status_code: 200,
            message: "Realtor created successfully",
            data: realtor
        };
    }

    @Put(':id')
    async update(@Param('id') realtorId: number, @Body() requestData: UpdateRealtorDto) {
        let realtor = await this.realtorRepository.findOne(realtorId);

        if (realtor === undefined) {
            throw new NotFoundException();
        }

        realtor = await this.realtorRepository.merge(realtor, requestData);
        realtor = await this.realtorRepository.save(realtor);

        return {
            status_code: 200,
            message: "Realtor updated successfully",
            data: realtor
        };
    }

    @Delete(':id')
    async remove(@Param('id') realtorId: number) {
        const realtor = await this.realtorRepository.findOne(realtorId);

        if (realtor === undefined) {
            throw new NotFoundException();
        }

        await this.realtorRepository.delete(realtorId);

        return {
            status_code: 200,
            message: "Realtor deleted successfully",
        };
    }
}