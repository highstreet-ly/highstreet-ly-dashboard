import Model, { belongsTo, hasMany } from '@ember-data/model';
import { attr } from '@ember-data/model';
import { computed, get, set } from '@ember/object';
export default class ProductExtraGroupModel extends Model {
    @attr('number')
    maxSelectable

    @attr('number')
    minSelectable

    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    description

    @belongsTo('ticketTypeConfiguration')
    ticketTypeConfiguration

    @hasMany('productExtra')
    productExtras

    @computed('id')
    get elementId(){
        return `product-extra-group-${this.id}`
    }

    // Helper
    @attr('boolean')
    edit
}
