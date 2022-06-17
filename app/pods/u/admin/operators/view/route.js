import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UAdminOperatorsViewRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service store;

    async model(params) {
      return await this.store.findRecord('event-organiser', params.id);
    }
  
    setupController(controller, model) {
      controller.set('organiser', model);
    }
}
