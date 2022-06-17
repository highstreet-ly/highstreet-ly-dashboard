import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UEventInstanceFeesRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  contextService;

  @service
  currentUser

  setupController(controller) {
    controller.set('eventOrganiser', this.currentUser.eventOrganiser);
    controller.set('eventSeries', this.contextService.eventSeries);
    controller.set('eventInstance', this.contextService.eventInstance);
  }
}
