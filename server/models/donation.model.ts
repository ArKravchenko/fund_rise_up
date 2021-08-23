import {getModelForClass, prop} from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {MongooseConnection} from "@server/config/typegoose.config";

export interface Donation extends Base {
}

export class Donation extends TimeStamps {
    @prop()
    amount: number;
    @prop()
    currency: string;
}

export const donationModel = getModelForClass(Donation, {
    existingMongoose: MongooseConnection.getInstance().getMongoose(),
    existingConnection: MongooseConnection.getInstance().getConnection()
})

