import { prop } from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';

export interface Donation extends Base {
}

export class Donation extends TimeStamps {
    @prop()
    amount: number;
    @prop()
    currency: string;
}

