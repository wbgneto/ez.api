import {Controller, Get, Query} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, createQueryBuilder, getConnection} from "typeorm";
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

        if(showBy == "revenue") {

            if(entityType == 'realtors'){
                
                const realtor = await getConnection()
                            .createQueryBuilder()
                            .select(["SUM(listing.price) AS price","realtor.id","realtor.name"])
                            .from(Listing, "listing")
                            .innerJoinAndSelect("listing.realtor", "realtor")
                            .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                            .groupBy("listing.realtor.id")
                            .getRawMany();

                console.log(realtor);
                let realtorInfo =[];
                for (let i=0; i<realtor.length; i++){
                    realtorInfo.push( 
                        {
                            id : realtor[i].id,
                            label: realtor[i].name,
                            value: realtor[i].price
                        }
                    );
                }
                return realtorInfo;
           
            } else if(entityType == 'houses') {
        
                const listings = await getRepository(Listing)
                            .createQueryBuilder()
                            .select(["SUM(listing.price) AS price" ,"listing.type" ])
                            .from(Listing, "listing")
                            .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                            .groupBy("listing.type")
                            .getRawMany();
                // console.log(listings);
                let listingInfo =[];
                for (let i=0; i<listings.length; i++){
                    let label;
                    console.log(listings[i].listing_type);
                    switch(listings[i].listing_type) {
                        case '0' : 
                            label = "Detached";
                            break;
                        case '1' : 
                            label = "Townhouse";
                            break;
                        case '2' :
                            label = "Condo";
                            break;
                        case '3' : 
                            label = "SemiDetached";
                            break;
                        case '4' :
                            label = "Duplex";
                            break;
                        case '5' :
                            label = "Triplex";
                            break;
                        default:
                            label = "Other";
                            break;
                    } ;
                    listingInfo.push( 
                        {
                            id : listings[i].listing_type,
                            label:label,
                            value: listings[i].price
                        }
                    );
                }
                return listingInfo;
    
            } else {
                console.log('Please Select either "realtors" or "houses" you are looking for!');
            }
            
        } else if(showBy == "quantity") {

            if(entityType == 'realtors'){
                
                const realtor = await getConnection()
                .createQueryBuilder()
                .select(["COUNT(listing.price) AS listingcount","realtor.id","realtor.name"])
                .from(Listing, "listing")
                .innerJoinAndSelect("listing.realtor", "realtor")
                .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                .groupBy("listing.realtor.id")
                .getRawMany();

                console.log(realtor);
                let realtorInfo =[];
                for (let i=0; i<realtor.length; i++){
                    realtorInfo.push( 
                        {
                            id : realtor[i].id,
                            label: realtor[i].name,
                            value: realtor[i].listingcount
                        }
                    );
                }
                return realtorInfo;
           
            } else if(entityType == 'houses') {
        
                const listings = await getRepository(Listing)
                .createQueryBuilder()
                .select(["COUNT(listing.type) AS typecount" ,"listing.type" ])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                .groupBy("listing.type")
                .getRawMany();
                // console.log(listings);
                let listingInfo =[];
                for (let i=0; i<listings.length; i++){
                    let label;
                    // console.log(listings[i].listing_type);
                    switch(listings[i].listing_type) {
                        case '0' : 
                            label = "Detached";
                            break;
                        case '1' : 
                            label = "Townhouse";
                            break;
                        case '2' :
                            label = "Condo";
                            break;
                        case '3' : 
                            label = "SemiDetached";
                            break;
                        case '4' :
                            label = "Duplex";
                            break;
                        case '5' :
                            label = "Triplex";
                            break;
                        default:
                            label = "Other";
                            break;
                    } ;
                    listingInfo.push( 
                        {
                            id : listings[i].listing_type,
                            label:label,
                            value: listings[i].typecount
                        }
                    );
                }
                return listingInfo;
    
            } else {
                console.log('Please Select either "realtors" or "houses" you are looking for!');
            }
           
        } else {
            console.log("Please Define either 'revenue' or 'quantity' in your showBy!");
        }
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
            message: 'Report retrieved successfully',
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
