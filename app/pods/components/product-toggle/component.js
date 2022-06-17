import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { notEmpty, filter } from '@ember/object/computed';
import { computed } from '@ember/object';

export default class ProductToggleComponent extends Component {

    @tracked
    parentProducts

    @filter('parentProducts', function (f) {
        return f.id == this.args.product.id
    }) filteredparentProducts

    @notEmpty('filteredparentProducts') parentDoesNotHaveProduct

    constructor() {
        super(...arguments);
        this.args.plan.get('ticketTypes').then((f) => {
            this.parentProducts = f
        })
    }

}
