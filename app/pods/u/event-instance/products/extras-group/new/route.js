import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class UEventInstanceProductsExtrasGroupNewRoute extends Route {
    @service contextService

    model(params) {
        console.log(params)
    }

    setupController(controller, model) {
        var newGroup = this.store.createRecord('product-extra-group', {
            name: '',
            description: '',
            minSelectable: 0,
            maxSelectable: 0,
            ticketTypeConfiguration: this.product
        });

        controller.set('product', this.contextService.editingProduct)
        controller.set('newGroup', newGroup)

    }
}
