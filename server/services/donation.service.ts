import {Donation} from "@server/models/donation.model";
import {DocumentType} from '@typegoose/typegoose/lib/types';
import {DonationDto} from "@server/dto/donation.dto";

export class DonationService {

    constructor(private donationModel) {}

    async createDonation(donation: DonationDto):Promise<DocumentType<Donation>>{
        const created = new this.donationModel(donation);
        return created.save()
    }
}
