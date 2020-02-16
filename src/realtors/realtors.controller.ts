import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { RealtorsService } from "./realtors.service";

@Controller('realtors')
export class RealtorsController {
    constructor(private realtorsService: RealtorsService) {}

    @Post()
    addRealtor(
        @Body('firstName') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string,
        @Body('addressId') realtorAddrId: number
    ) {
        this.realtorsService.insertRealtor(realtorFirstName, realtorLastName, realtorPhone, realtorAddrId);
    }

    @Get()
    getAllRealtors() {
        return this.realtorsService.getRealtors();
    }

    @Get(':id')
    getProduct(@Param('id') realtorId: number) {
        return this.realtorsService.getSingleRealtor(realtorId);
    }

    @Put(':id')
    updateRealtor(
        @Param('id') realtorId: number, 
        @Body('firstName') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string,
        @Body('addressId') realtorAddrId: number
        ) {
          return this.realtorsService.updateRealtor(realtorId, realtorFirstName, realtorLastName, realtorPhone, realtorAddrId);
        
    }

    @Delete(':id')
    removeRealtor(@Param('id') realtorId: number) {
        this.realtorsService.deleteRealtor(realtorId);
        return null;
    }
}