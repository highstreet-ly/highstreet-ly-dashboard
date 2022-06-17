import { attr } from '@ember-data/model';
import Model, { belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SubscriptionModel extends Model {

    @belongsTo('eventOrganiser')
    eventOrganiser

    @attr('string')
    name

    @attr('string')
    integrationId

    @attr('string')
    customerId

    @attr('string')
    userId

    @attr('string')
    userEmail

    @belongsTo('plan')
    plan

    @attr('number')
    planQuantity

    @hasMany('addOn')
    addOns

    @attr('number')
    planUnitPrice

    @attr('number')
    billingPeriod

    @attr('string')
    billingPeriodUnit

    @attr('number')
    planFreeQuantity

    @attr('string')
    status

    @attr('number')
    trialStart

    @computed('trialStart')
    get trialStartDate(){
        var d = new Date(this.trialStart * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    trialEnd

    @computed('trialEnd')
    get trialEndDate(){
        var d = new Date(this.trialEnd * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    currentTermStart

    @computed('currentTermStart')
    get currentTermStartDate(){
        var d = new Date(this.currentTermStart * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    currentTermEnd

    @computed('currentTermEnd')
    get currentTermEndDate(){
        var d = new Date(this.currentTermEnd * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    createdAt

    @computed('createdAt')
    get createdAtDate(){
        var d = new Date(this.createdAt * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    startedAt

    @computed('startedAt')
    get startedAtDate(){
        var d = new Date(this.startedAt * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    activatedAt

    @computed('activatedAt')
    get activatedAtDate(){
        var d = new Date(this.activatedAt * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }
   

    @attr('number')
    cancelledAt

    @computed('cancelledAt')
    get cancelledAtDate(){
        var d = new Date(this.cancelledAt * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    updatedAt

    @computed('updatedAt')
    get updatedAtDate(){
        var d = new Date(this.updatedAt * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    pauseDate

    @computed('pauseDate')
    get pauseDateDate(){
        var d = new Date(this.pauseDate * 1000)

        return new moment(d).format('DD-MM-YYYY')
    }

    @attr('number')
    resourceVersion

    @attr('boolean')
    deleted

    @attr('string')
    currencyCode
}
