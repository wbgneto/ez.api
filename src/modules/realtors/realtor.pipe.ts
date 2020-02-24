import { ValidationSchema } from 'class-validator';

export let realtorValidationSchema: ValidationSchema = {
    name: 'RealtorSchema',
    properties: {
        firstname: [{
            type: "minLength",
            constraints: [3]
        }, {
            type: "maxLength",
            constraints: [20]
        }],
        lastname: [{
            type: "minLength",
            constraints: [3]
        }, {
            type: "maxLength",
            constraints: [20]
        }],
        phone: [{
            type: "isPhoneNumber",
            constraints: []
        }],
        addressId: [{
            type: "isNumber",
            constraints: []
        }]
    }
}