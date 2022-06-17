import { attr } from '@ember-data/model';
import Model, { belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class ChargeModel extends Model {
    @belongsTo('payment')
    payment

    @belongsTo('charge')
    charge

    @attr('boolean')
    refunded

    @attr('string')
    chargeId

    @attr('string')
    paymentIntent

    @hasMany('refund')
    refunds

    @attr('number')
    amount

    @attr('number')
    amountCaptured

    @attr('string')
    failureCode

    @attr('string')
    failureMessage

    @attr('string')
    recieptUrl
}
