import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class EventInstanceProductsEditRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service contextService
  @service store

 async model(params) {
    return {
      product: await this.store.findRecord('ticket-type-configuration', params.productId, {
        include: 'product-extra-groups,product-extra-groups.product-extras,images,product-category'
      }),
      products: await this.store.query('ticket-type-configuration', {
        filter: {
          'event-instance-id': this.contextService.eventInstance.id
        },
        include: 'product-extra-groups.product-extras'
      }),
      productCategories: await this.store.query('product-category', {
        filter: {
          'event-instance-id': this.contextService.eventInstance.id
        },
        sort: 'sort-order'
      })
    }
  }

  async setupController(controller, model) {

    await model.product.productCategory

    let allGroups = []

    for (let i = 0; i < model.products.length; i++) {
        let p = model.products.objectAt(i)
        let eg = p.productExtraGroups

        eg.forEach(g => {
            allGroups.push(g)
        })
    }

    controller.set('allGroups', allGroups)

    controller.set('product', model.product)
    this.contextService.setEditingProduct( model.product)
    controller.set('eventInstance', this.contextService.eventInstance)
    controller.set('products', model.products);
    controller.set('productCategories', model.productCategories)
  }
}
