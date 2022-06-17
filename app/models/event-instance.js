import DS from 'ember-data';

const { Model } = DS;
import { attr } from '@ember-data/model';
import { computed, get, set } from '@ember/object';
import ENV from 'sonaticket-dashboard/config/environment';
import { filterBy } from '@ember/object/computed';
import { notEmpty } from '@ember/object/computed';

import { belongsTo, hasMany } from '@ember-data/model';

const tuncLength = 16;
import moment from 'moment';

function truncate(input) {
  if (input.length > tuncLength) {
    return input.substring(0, tuncLength) + '...';
  }
  else {
    return input;
  }
}

export default Model.extend({
  name: attr(),
  normalizedName: attr('string'),
  shortName: computed('name', function () {
    return truncate(this.name);
  }),

  businessType: belongsTo('business-type'),

  openingTimes: attr('raw'),
  features: hasMany('feature'),


  slug: attr('string'),
  eventSeriesId: attr('string'),
  eventOrganiserId: attr('string'),
  description: attr('string'),
  shortLocation: attr('string'),
  location: attr('string'),
  postcode: attr('string'),
  deliveryRadiusMiles: attr('number'),
  lat: attr('string'),
  lng: attr('string'),
  category: attr('string'),
  isPublished: attr('boolean'),
  showWaitingList: attr('boolean'),
  isOpen: attr('boolean'),
  isStockManaged: attr('boolean'),
  dateCreated: attr('date'),

  featured: attr('boolean'),
  ordersConfirmed: attr('number'),
  supportEmail: attr('string'),
  supportPhone: attr('string'),

  notificationEmail: attr('string'),
  notificationPhone: attr('string'),

  ownerId: attr('string'),
  logoImageId: attr('string'),
  mainImageId: attr('string'),
  heroImageId: attr('string'),
  isClickAndCollect: attr('boolean'),
  isLocalDelivery: attr('boolean'),
  isNationalDelivery: attr('boolean'),
  isToTable: attr('boolean'),
  deleted: attr('boolean'),

  nationalDeliveryFlatFee: attr('number', { defaultValue: '0' }),
  nationalDeliveryFlatFeeFreeAfter: attr('number', { defaultValue: '0' }),

  // 1 us, 2 customer, 3 operator
  paymentPlatformFeePaidBy: attr('number', { defaultValue: '2' }),

  // 1 us, 2 customer, 3 operator
  platformFeePaidBy: attr('number', { defaultValue: '2' }),

  ticketsSoldByDay: DS.hasMany('ticketsSoldByDay'),
  images: DS.hasMany('image'),

  nationalDeliveryFlatFeeAsPounds: computed('nationalDeliveryFlatFee', {
    get() {
      return (this.nationalDeliveryFlatFee ? (this.nationalDeliveryFlatFee / 100) : 0).toFixed(2);
    },
    set(key, value) {
      set(this, 'nationalDeliveryFlatFee', (value * 100));
    },
  }),

  nationalDeliveryFlatFeeFreeAfterAsPounds: computed('nationalDeliveryFlatFeeFreeAfter', {
    get() {
      return (this.nationalDeliveryFlatFeeFreeAfter ? (this.nationalDeliveryFlatFeeFreeAfter / 100) : 0).toFixed(2);
    },
    set(key, value) {
      set(this, 'nationalDeliveryFlatFeeFreeAfter', (value * 100));
    },
  }),

  url: computed('slug', function () {
    let url = ENV.sonatribe.TicketsUi + '/' + this.slug;
    return url.replace(/^https?:\/\//, '');
  }),

  isStockManaged: notEmpty('isStockManagedFiltered'),
  isAdHocOpeningTimes: notEmpty('isAdHocOpeningTimesFiltered'),

  isStockManagedFiltered: filterBy('features', 'claimValue', 'managed-stock'),
  isAdHocOpeningTimesFiltered: filterBy('features', 'claimValue', 'ad-hoc-opening-times'),
});
