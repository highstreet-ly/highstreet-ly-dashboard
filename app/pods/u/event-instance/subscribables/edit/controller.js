import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class UEventInstanceSubscribablesEditController extends Controller {


    @action
    async removeProduct(p) {
        this.plan.get('ticketTypes').removeObject(p)
    }

    @action
    async addProduct(p) {
        this.plan.get('ticketTypes').pushObject(p)
    }
}
