import {Controller, Get, Query} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {Listing} from "../listings/listing.entity";
import {Realtor} from "../realtors/realtor.entity";

@Controller('reports')
export class ReportsController {
    constructor(
        @InjectRepository(Realtor)
        private realtorRepository: Repository<Realtor>,
        @InjectRepository(Listing)
        private listingRepository: Repository<Listing>,
    ) {}

    /**
     * @param query.start_date    string       Date
     * @param query.end_date      string       Date
     * @param query.type          string       realtor/house
     * @param query.display       string       revenue/quantity
     */
    @Get('sales-distribution')
    async getSalesDistribution(@Query() query)
    {
        const entityType = query.type;
        const startDate = query.start_date;
        const endDate = query.end_date;
        const showBy = query.showBy; // Quantity or SUM of amount

        // Return last 12 months of sales
        return {
            status_code: 200,
            message: 'Listing found',
            data: [
                {
                    ids: [1],
                    label: 'Object 1',
                    value: Math.round(Math.random() * 10)
                },
                {
                    ids: [2],
                    label: 'Object 2',
                    value: Math.round(Math.random() * 10)
                },
                {
                    ids: [3],
                    label: 'Object 3',
                    value: Math.round(Math.random() * 10)
                },
                {
                    ids: [4,5,6],
                    label: 'Others',
                    value: Math.round(Math.random() * 10)
                }
            ],
        };
    }

    /**
     * @param query.type    string       agent/house
     * @param query.id      null|array  Id of the entity
     * @param query.display string       revenue/quantity
     */
    @Get('overall-sales')
    async getOverallSales(@Query() query)
    {
        const entityType = query.type;
        const entityId = query.id;
        const showBy = query.showBy; // Quantity or SUM of amount

        // Return last 12 months of sales
        return {
            status_code: 200,
            message: 'Listing found',
            data:  [
                {
                    label: 'Mar 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Apr 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'May 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Jun 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Jul 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Aug 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Sep 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Oct 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Nov 19',
                    value: Math.round(Math.random() * 10)
                },
                {
                    label: 'Dec 19',
                    value: Math.round(Math.random() * 10)
                }
            ]
        };
    }
}
