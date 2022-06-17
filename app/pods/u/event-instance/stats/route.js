import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UEventInstanceStatsRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  contextService;

  async model() {
    await this.modelFor('u.event-instance');
  }

  setupController(controller) {
    controller.set('eventSeries', this.contextService.eventSeries);
    controller.set('eventInstance', this.contextService.eventInstance);
  }
}
