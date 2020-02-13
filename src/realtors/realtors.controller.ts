import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { RealtorsService } from "./realtors.service";

@Controller('realtors')
export class RealtorsController {
    constructor(private readonly realtorsService: RealtorsService) {}

    @Post()
    addRealtor(
        @Body('firstname') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string,
        @Body('addressId') realtorAddrId: number
    ) {
        const generatedId = this.realtorsService.insertRealtor(realtorFirstName, realtorLastName, realtorPhone, realtorAddrId);
        return generatedId;
    }

    @Get()
    getAllRealtors() {
        return this.realtorsService.getRealtors();
    }

    @Get(':id')
    getProduct(@Param('id') realtorId: number) {
        return this.realtorsService.getSingleRealtor(realtorId);
    }

    @Patch(':id')
    updateRealtor(
        @Param('id') realtorId: number, 
        @Body('firstname') realtorFirstName: string,
        @Body('lastName') realtorLastName: string,
        @Body('phone') realtorPhone: string,
        @Body('addressId') realtorAddrId: number
        ) {
          this.realtorsService.updateRealtor(realtorId, realtorFirstName, realtorLastName, realtorPhone, realtorAddrId);
          return null;  
    }

    @Delete(':id')
    removeRealtor(@Param('id') realtorId: number) {
        this.realtorsService.deleteRealtor(realtorId);
        return null;
    }
}