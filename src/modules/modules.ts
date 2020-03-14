import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {database} from '../../config/database.config';
import {RealtorsModule} from './realtors/realtors.module';
import {ListingsModule} from "./listings/listings.module";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {ReportsModule} from "./reports/reports.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(database),
        RealtorsModule,
        ListingsModule,
        AuthModule,
        UsersModule,
        ReportsModule
    ],
    controllers: [],
    providers: [],
})
export class Modules {
}