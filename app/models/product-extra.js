import Model, { belongsTo, hasMany } from '@ember-data/model'
import { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class ProductExtraModel extends Model {
    @attr('number')
    price

    @attr('boolean')
    selected

    @attr('number')
    itemCount

    @attr('string')
    description

    @attr('string')
    name

    @attr('string')
    normalizedName

    @belongsTo('productExtraGroup')
    productExtraGroup

    @attr('number', {
      defaultValue() { return 0; }
    })
    sortOrder

    @computed('price')
    get priceFormatted() {
      return (this.price / 100).toFixed(2);
    }

    @computed('price')
    get priceDecimal() {
      return this.price / 100;
    }

    set priceDecimal(value){
        this.set('price', value * 100) 
    }
}
