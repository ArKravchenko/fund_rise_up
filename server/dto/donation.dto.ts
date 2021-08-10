import {IsInt, Min, IsIn } from 'class-validator'


export class DonationDto {

    constructor(dto:{[key:string]:any}) {
        this.amount = dto.amount;
        this.currency = dto.currency;
    }

    @IsInt()
    @Min(1)
    amount: number;

    @IsIn(['USD', 'EUR', 'GBP', 'RUB'])
    currency: string;
}
