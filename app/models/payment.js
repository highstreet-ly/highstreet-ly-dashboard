import DS from 'ember-data';
import { computed, get } from '@ember/object';
import { attr } from '@ember-data/model';
import Model, { belongsTo, hasMany } from '@ember-data/model';

export default DS.Model.extend({
  description: attr('string'),
  state: attr(),
  totalAmount: attr(),
  lastFour: attr(),
  applicationFeeAmount: attr(),
  created: attr(),
  currency: attr(),
  charges: hasMany('charge'),
  paymentIntentId: attr('string'),
  orderId: attr('string'),
  email: attr('string'),


  stateValue: computed('state', function () {
    switch (this.state) {
      case 0:
        return 'Initiated';
      case 1:
        return 'Accepted';
      case 2:
        return 'Completed';
      case 3:
        return 'Rejected';
    }
    return "Unknown State";
  })
});
