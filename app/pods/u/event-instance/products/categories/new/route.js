import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class UEventInstanceProductsCategoriesNewRoute extends Route {
  @service contextService
  @service store

  async model() {
    let eventInstance = await this.contextService.eventInstance;
    let productCategory = await this.store.createRecord('productCategory', {
      eventInstanceId: this.contextService.eventInstance.id,
      enabled: true,
      sortOrder: 0
    });

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
