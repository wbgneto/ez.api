// import * as mysql from 'mysql';

// export const RealtorSchema = new mysql.Schema({
//      id: { type: Number, required: true },
//      fistName: { type: String, required: true },
//      lastName: { type: String, required: true },
//      phone: { type: String, required: true },
//      addressId: { tyepe: Number, required: true },
//      createdDate: { tyepe: Date, required: true }
// });

export class Realtor {

    constructor(
        public id: number,
        public fistName: string,
        public lastName: string,
        public phone: string,
        public addressId: number,
        public createdDate: Date
    ) {};
}