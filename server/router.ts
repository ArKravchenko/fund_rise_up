import {validate} from "class-validator";

const Router = require('koa-router');
import {DonationService} from './services/donation.service'
import {DonationDto} from "@server/dto/donation.dto";
import {ValidationError} from "class-validator/types/validation/ValidationError";
import {donationModel} from "@server/models/donation.model";


const donationSevice = new DonationService(donationModel);

const router = Router({
    prefix: '/api'
});


router.post('/add', addNewTransaction);

async function addNewTransaction(ctx) {
    let dto = JSON.parse(ctx.request.body);
    const donation = new DonationDto(dto)
    const errors: ValidationError[] = await validate(donation);
    if (!!errors.length) {
        console.log("errors: ", errors)
        ctx.status = 403;
        ctx.body = {
            ok: false,
            errors: errors.map(el => Object.values(el.constraints))
        };
    } else {
        const created = await donationSevice.createDonation(dto)
        ctx.status = 200;
        ctx.body = {
            ok: true,
            message: created
        };
    }

}

module.exports = router;