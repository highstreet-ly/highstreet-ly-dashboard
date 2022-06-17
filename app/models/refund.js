import { attr } from '@ember-data/model';
import Model, { belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class RefundModel extends Model {
    @belongsTo('charge')
    charge

    @attr('string')
    reason

    @attr('string')
    currency

    @attr('string')
    paymentIntent

    @attr('string')
    receiptNumber

    @attr('boolean')
    sourceTransferReversal

    @attr('boolean')
    transferReversal

    @attr('string')
    status

    @attr('number')
    amount

    @attr('string')
    refundNote

    @attr('date')
    created

}
