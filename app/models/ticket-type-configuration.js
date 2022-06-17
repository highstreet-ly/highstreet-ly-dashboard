import DS from 'ember-data';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import {belongsTo} from '@ember-data/model';

export default DS.Model.extend({
    name: attr('string'),
    normalizedName: attr('string'),
    description: attr('string'),
    freeTier: attr('boolean', { defaultValue: true }),
    price: attr('number'),
    quantity: attr('number'),
    availableQuantity: attr('number'),
    eventSlug: attr('string'),
    scheduleStartDate: attr('date'),
    scheduleEndDate: attr('date'),
    eventInstanceId: attr('string'),
    mainImageId: attr('string'),
    tags: attr('string'),
    isPublished: attr('boolean'),
    addQuantity: attr('number'),
    images: DS.hasMany('image'),
    sortOrder: attr('number', {defaultValue:0}),
    productExtraGroups:  DS.hasMany('productExtraGroup'),

    productCategory: DS.belongsTo('product-category'),

    priceFormatted: computed('price', function () {
      return this.price ? this.price.toFixed(2) : 0;
    }),

    wasNeverScheduled: computed('scheduleStartDate', function () {
        return !this.scheduleStartDate || this.scheduleStartDate.getUTCFullYear() < 2017;
    }),

    isScheduled: computed('scheduleStartDate', function () {
        return  this.scheduleStartDate && this.scheduleStartDate.getUTCFullYear() > 2017 && this.scheduleStartDate > new Date();
    }),

    wasScheduled: computed('scheduleStartDate', function () {
        return this.scheduleStartDate && this.scheduleStartDate.getUTCFullYear() > 2017 && this.scheduleStartDate < new Date();
    }),

    quantitySold: computed('quantity', 'availableQuantity', function () {
        return this.quantity - this.availableQuantity;
    }),

    percentageSold: computed('quantity', 'availableQuantity', function () {

        let numberSold = this.quantity - this.availableQuantity;

        let result = 100 * numberSold / this.quantity;
        return result;
    }),

    percentAvailable: computed('quantity', 'availableQuantity', function () {
        let numberSold = this.quantity - this.availableQuantity;

        let result = 100 * numberSold / this.quantity;
        return (100 - result);
    })
});
