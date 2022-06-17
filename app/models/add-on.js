import Model, { belongsTo, hasMany } from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class AddOnModel extends Model {
    @hasMany('plan')
    plans

    @hasMany('feature')
    features

    @attr('string')
    integrationId

    @belongsTo('subscription')
    subscription

    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    description

    @attr('string')
    pricingModel

    @attr('number')
    price

    @attr('string')
    status

    @attr('string')
    chargeType

    @attr('string')
    currencyCode

    @attr('number')
    period

    @attr('string')
    periodUnit

    @attr('boolean')
    enabledInPortal

    @attr('boolean')
    isShippable

    @attr('boolean')
    showDescriptionInInvoices

    @attr('boolean')
    showDescriptionInQuotes
}
