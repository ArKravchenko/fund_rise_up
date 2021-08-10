import {Donation} from "@server/models/donation.model";
import {getModelForClass} from "@typegoose/typegoose";
import {ModelType, DocumentType} from '@typegoose/typegoose/lib/types';


import {getMongoString, getMongoOptions} from '../config/typegoose.config'
import * as mongoose from 'mongoose';
import {Connection} from "mongoose";
import {DonationDto} from "@server/dto/donation.dto";


export class DonationService {
    connection: Connection;
    DonationModel: ModelType<Donation>;

    constructor() {
        mongoose.connect(getMongoString(), getMongoOptions());
        this.connection = mongoose.connection;
        this.connection.on('error', (error)=>{
            console.log('connection error: ', error)
        });
        this.connection.once('open', function () {
            console.log('Mongo got connected')
        });
        this.DonationModel = getModelForClass(Donation, {
            existingMongoose: mongoose,
            existingConnection: this.connection
        })
    }

    async createDonation(donation: DonationDto):Promise<DocumentType<Donation>>{
        const created = new this.DonationModel(donation);
        return created.save()
    }
}
