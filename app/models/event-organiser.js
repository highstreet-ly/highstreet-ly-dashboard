import Model, { belongsTo, hasMany } from '@ember-data/model'
import { attr } from '@ember-data/model';
import { computed, get } from '@ember/object'

export default Model.extend({
    isConnectedToStripe: attr('boolean'),
    userId: attr(),
    stripeCode: attr(),
    url: attr(),
    description: attr(),
    logoId: attr(),
    name: attr(),
    normalizedName: attr('string'),
    platformFee: attr('number'),
    schemaType: attr('string'),
    dashboardStats: belongsTo('dashboard-stat'),
    images: hasMany('image'),
    eventSeries: hasMany('eventSeries'),
    subscriptions: hasMany('subscription'),

    formattedPlatformFee: computed('platformFee', {
        get() {
            return this.platformFee / 100
        }
    })
})
