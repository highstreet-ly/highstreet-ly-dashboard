import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class UEventInstanceProductsExtrasGroupEditRoute extends Route {
    @service contextService

   async model(params) {
        console.log(params.extraGroupId)
        var group = await this.store.findRecord('product-extra-group', params.extraGroupId)
        return group
    }

    setupController(controller, model) {
        controller.set('product', this.contextService.editingProduct)
        controller.set('editGroup', model)
    }
}
