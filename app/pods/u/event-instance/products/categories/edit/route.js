import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'
import {hash} from 'rsvp';

export default class UEventInstanceProductsCategoriesEditRoute extends Route {
  @service contextService
  @service store

  async model(params) {
    let eventInstance = await this.contextService.eventInstance;
    let productCategory = await this.store.findRecord('product-category', params.categoryId);

    return hash({
      productCategory: productCategory,
      eventInstance: eventInstance
    });
  }

  setupController(controller, model) {
    controller.set('productCategory', model.productCategory);
    controller.set('eventInstance', model.eventInstance);
  }
}
