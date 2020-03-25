import {BadRequestException, Controller, Get, Query} from "@nestjs/common";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, createQueryBuilder, getConnection} from "typeorm";
import {Listing} from "../listings/listing.entity";
import {Realtor} from "../realtors/realtor.entity";
import * as moment from 'moment'

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
        const display = query.display; // Quantity or SUM of amount

        if(display == "revenue") {

            if(entityType == 'realtors'){
                
                const realtor = await getConnection()
                            .createQueryBuilder()
                            .select(["SUM(listing.price) AS price","realtor.id","realtor.name"])
                            .from(Listing, "listing")
                            .innerJoinAndSelect("listing.realtor", "realtor")
                            .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                            .groupBy("listing.realtor.id")
                            .getRawMany();

                let realtorInfo =[];
                for (let i=0; i<realtor.length; i++){
                    realtorInfo.push( 
                        {
                            id : [realtor[i].id],
                            label: realtor[i].name,
                            value: parseInt(realtor[i].price)
                        }
                    );
                }

                let sortedrealtor = realtorInfo.sort((a, b) => (a.value > b.value) ? -1 : 1);
                let top3 = sortedrealtor.splice(0,3);
                console.log(sortedrealtor);
                let others = sortedrealtor.splice(4);
                
                others = sortedrealtor.reduce((total, next) => {   
                    return parseInt(total) + parseInt(next.value);
                }, 0);
                let realtorlist = top3;
                if(others) {
                    realtorlist.push({
                        id: sortedrealtor.map( el => parseInt((el.id).toString())),
                        label: "Others",
                        value: others
                    });
                }
                console.log("this is others"+ others);
                return realtorlist;
           
            } else if(entityType == 'houses') {
        
                const listings = await getRepository(Listing)
                            .createQueryBuilder()
                            .select(["SUM(listing.price) AS price" ,"listing.type" ])
                            .from(Listing, "listing")
                            .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                            .groupBy("listing.type")
                            .getRawMany();
                let listingInfo =[];
                for (let i=0; i<listings.length; i++){
                    let label;
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
                            id : [listings[i].listing_type],
                            label:label,
                            value: parseInt(listings[i].price)
                        }
                    );
                }
                
                let sortedlisting = listingInfo.sort((a, b) => (a.value > b.value) ? -1 : 1);
                let top3 = sortedlisting.splice(0,3);
                let others = sortedlisting.splice(4);
                others = sortedlisting.reduce((total, next) => {   
                    return parseInt(total) + parseInt(next.value);
                }, 0);
                let realtorlist = top3;
                if(others) {
                    realtorlist.push({
                        id: sortedlisting.map( el => parseInt((el.id).toString())),
                        label: "Others",
                        value: others
                    });
                }
                return realtorlist;
    
            } else {
                throw new BadRequestException('Please Select either "realtors" or "houses" you are looking for!');
            }
            
        } else if(display == "quantity") {

            if(entityType == 'realtors'){
                
                const realtor = await getConnection()
                .createQueryBuilder()
                .select(["COUNT(DISTINCT(listing.id)) AS listingcount","realtor.id","realtor.name"])
                .from(Listing, "listing")
                .innerJoinAndSelect("listing.realtor", "realtor")
                .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                .groupBy("listing.realtor.id")
                .getRawMany();

                let realtorInfo =[];
                for (let i=0; i<realtor.length; i++){
                    realtorInfo.push( 
                        {
                            id : [realtor[i].id],
                            label: realtor[i].name,
                            value: parseInt(realtor[i].listingcount)
                        }
                    );
                }
                
                let sortedrealtor = realtorInfo.sort((a, b) => (a.value > b.value) ? -1 : 1);
                let top3 = sortedrealtor.splice(0,3);
                console.log(sortedrealtor);
                let others = sortedrealtor.splice(4);
                others = sortedrealtor.reduce((total, next) => {   
                    return parseInt(total) + parseInt(next.value);
                }, 0);
                let realtorlist = top3;
                if(others) {
                    realtorlist.push({
                        id: sortedrealtor.map( el => parseInt((el.id).toString())),
                        label: "Others",
                        value: others
                    });
                }
                return realtorlist;
           
            } else if(entityType == 'houses') {
        
                const listings = await getRepository(Listing)
                .createQueryBuilder()
                .select(["COUNT(DISTINCT(listing.id)) AS typecount" ,"listing.type" ])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.created_at BETWEEN :start AND :end", {start: startDate, end:endDate})
                .groupBy("listing.type")
                .getRawMany();
                let listingInfo =[];
                for (let i=0; i<listings.length; i++){
                    let label;
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
                            id : [listings[i].listing_type],
                            label:label,
                            value: parseInt(listings[i].typecount)
                        }
                    );
                }
                let sortedlisting = listingInfo.sort((a, b) => (a.value > b.value) ? -1 : 1);
                let top3 = sortedlisting.splice(0,3);
                console.log(sortedlisting);
                let others = sortedlisting.splice(4);
                others = sortedlisting.reduce((total, next) => {   
                    return parseInt(total) + parseInt(next.value);
                }, 0);
                let realtorlist = top3;
                if(others) {
                    realtorlist.push({
                        id: sortedlisting.map( el => parseInt((el.id).toString())),
                        label: "Others",
                        value: others
                    });
                }
                return realtorlist;
    
            } else {
                throw new BadRequestException('Please Select either "realtors" or "houses" you are looking for!');
            }
           
        } else {
            throw new BadRequestException("Please Define either 'revenue' or 'quantity' in your display!");
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
        const display = query.display; // Quantity or SUM of amount
        const oneYearAgo = moment().subtract(1, 'year').format('YYYY-MM-DD');
        console.log(entityId);
        
      
        let ids ;
        if(entityId) {
            let eid = entityId.substr(1).slice(0, -1);
            ids = eid.split(',');
        } else {
            ids = null;
        }
        
        console.log(typeof entityId);
        console.log(ids);
        console.log(typeof ids);

        if( display == 'revenue' ) {

            if (entityType == null) {

                const allsales = await getRepository(Listing)
                .createQueryBuilder()
                .select(["SUM(listing.price) AS price" ,"YEAR(listing.sold_at) AS year", "MONTHNAME(listing.sold_at) AS month" ])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.sold_at > :oneyear", {oneyear: oneYearAgo})
                .groupBy("year")
                .addGroupBy("month")
                .getRawMany();
    
                let overallsale = [];
                console.log(allsales);
                for(let i=0; i< allsales.length; i++) {
                    let label = allsales[i].month + ' ' + allsales[i].year;
                    overallsale.push({
                        label: label,
                        value: allsales[i].price
                    });
                }
                return overallsale;

            } else if ( entityType == 'houses' ) {

                const allsales = await getRepository(Listing)
                .createQueryBuilder()
                .select(["SUM(listing.price) AS price" ,"YEAR(listing.sold_at) AS year", "MONTHNAME(listing.sold_at) AS month"])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.type IN (:...rid) AND listing.sold_at > :oneyear", {rid:ids, oneyear: oneYearAgo})
                .groupBy("year")
                .addGroupBy("month")
                .getRawMany();
                
                console.log(allsales);
                let overallsale = [];
                console.log(allsales);
                for(let i=0; i< allsales.length; i++) {
                    let label = allsales[i].month + ' ' + allsales[i].year;
                    overallsale.push({
                        label: label,
                        value: allsales[i].price
                    });
                }
                console.log(overallsale);
                return overallsale;

            } else if (entityType == 'realtors') {

                const allsales = await getRepository(Listing)
                .createQueryBuilder()
                .select(["SUM(listing.price) AS price" ,"YEAR(listing.sold_at) AS year", "MONTHNAME(listing.sold_at) AS month", "ANY_VALUE(listing.realtor.id)"])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.realtor.id IN (:...rid) AND listing.sold_at > :oneyear", {rid:ids, oneyear: oneYearAgo})
                .groupBy("year")
                .addGroupBy("month")
                .getRawMany();
    
                let overallsale = [];
                console.log(allsales);
                for(let i=0; i< allsales.length; i++) {
                    let label = allsales[i].month + ' ' + allsales[i].year;
                    overallsale.push({
                        label: label,
                        value: allsales[i].price
                    });
                }
                return overallsale;

            } else {
                throw new BadRequestException('Please define an entity Type!');
            }

        } else if ( display == 'quantity') {

            if (entityType == null) {

                const allsales = await getRepository(Listing)
                .createQueryBuilder()
                .select(["COUNT(DISTINCT(listing.id)) AS count" ,"YEAR(listing.sold_at) AS year", "MONTHNAME(listing.sold_at) AS month" ])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.sold_at > :oneyear", {oneyear: oneYearAgo})
                .groupBy("year")
                .addGroupBy("month")
                .getRawMany();
    
                let overallsale = [];
                console.log(allsales);
                for(let i=0; i< allsales.length; i++) {
                    let label = allsales[i].month + ' ' + allsales[i].year;
                    overallsale.push({
                        label: label,
                        value: allsales[i].count
                    });
                }
                return overallsale;

            } else if ( entityType == 'houses' ) {

                const allsales = await getRepository(Listing)
                .createQueryBuilder()
                .select(["COUNT(DISTINCT(listing.id))  AS count" ,"YEAR(listing.sold_at) AS year", "MONTHNAME(listing.sold_at) AS month"])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.id IN (:...rid) AND listing.sold_at> :oneyear", {rid:ids, oneyear: oneYearAgo})
                .groupBy("year")
                .addGroupBy("month")
                .getRawMany();
                
                console.log(allsales);
                let overallsale = [];
                console.log(allsales);
                for(let i=0; i< allsales.length; i++) {
                    let label = allsales[i].month + ' ' + allsales[i].year;
                    overallsale.push({
                        label: label,
                        value: allsales[i].count
                    });
                }
                console.log(overallsale);
                return overallsale;

            } else if (entityType == 'realtors') {


                const allsales = await getRepository(Listing)
                .createQueryBuilder()
                .select(["COUNT(DISTINCT(listing.id))  AS count" ,"YEAR(listing.sold_at) AS year", "MONTHNAME(listing.sold_at) AS month" ])
                .from(Listing, "listing")
                .where("listing.status='2' AND listing.realtor.id IN (:...rid) AND listing.sold_at> :oneyear", {rid:ids, oneyear: oneYearAgo})
                .groupBy("year")
                .addGroupBy("month")
                .getRawMany();
                console.log('--------------------------------------');
                console.log(allsales);
    
                let overallsale = [];
                console.log(allsales);
                for(let i=0; i< allsales.length; i++) {
                    let label = allsales[i].month + ' ' + allsales[i].year;
                    overallsale.push({
                        label: label,
                        value: allsales[i].count
                    });
                }
                return overallsale;

            } else {
                throw new BadRequestException('Please define an entity Type!');
            }

        } else {
            throw new BadRequestException("Please Define either 'revenue' or 'quantity' in your display!");
        }
    }
}
