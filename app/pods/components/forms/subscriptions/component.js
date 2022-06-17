import classic from 'ember-classic-decorator'
import { inject as service } from '@ember/service'
import Component from '@ember/component'
import { action } from '@ember/object';

import { later } from '@ember/runloop';

@classic
export default class FormsSubscriptionsComponent extends Component {
    @service
    currentUser


    @action
    didInsert() {
        later(() => {
            let instance = Chargebee.getInstance();
            let cart = instance.getCart();
            let customer = { email: this.currentUser.userModel.email }
            cart.setCustomer(customer);
            Chargebee.registerAgain();
        }, 500);
    }
}
