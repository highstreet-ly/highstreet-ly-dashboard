import { attr } from '@ember-data/model';
import Model, { belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default class PlanModel extends Model {
    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    description

    @attr('string')
    integrationId

    @attr('number')
    price

    @attr('number', {
      defaultValue() { return 0 }
    })
    sortOrder

    @computed('price')
    get priceFormatted() {
      return (this.price * 1.5).toFixed(2).replace(/[.,]00$/, "");
    }

    @hasMany('addOn')
    addOns

    @hasMany('feature')
    features

    @attr('string')
    pricingModel

    sortBy = ['sortOrder'];
    @sort('features', 'sortBy')
    sortedFeatures;

    @hasMany('subscription')
    subscriptions

    @computed('integrationId')
    get formattedIntegrationId() {
        if (this.integrationId)
            return this.integrationId.substring(1)
    }

    @attr('string')
    status

    @attr('string')
    chargeModel

    @attr('string')
    currencyCode

    @attr('boolean')
    enabledInHostedPages

    @attr('boolean')
    enabledInPortal

    @attr('number')
    freeQuantity

    @attr('number')
    period

    @attr('string')
    periodUnit

    @attr('boolean')
    showDescriptionInInvoices

    @attr('boolean')
    showDescriptionInQuotes

    @attr('boolean')
    taxable

    @attr('string')
    eventOrganiserId

    @attr('string')
    mainImageId

    @attr('string')
    eventInstanceId

    @hasMany('ticket-type')
    ticketTypes

    @attr('boolean')
    publiclyVisible
}
