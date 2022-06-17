import Model, { hasMany } from '@ember-data/model';
import { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class TicketDetailModel extends Model {
    @hasMany('productExtra')
    productExtras

    @attr('string')
    name

    @attr('string')
    displayName

    @attr('number')
    price

    @attr('number')
    quantity

    @computed('price', 'quantity')
    get totalPrice() {
      return this.quantity * this.price;
    }

    @computed('productExtras')
    get extrasString() {
      let arr = [];
      this.productExtras.forEach(extra => {
        arr.push(extra.name);
      });
      return arr.join(', ').replace(/,(?=[^,]*$)/, ' and');
    }
}
