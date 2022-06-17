import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default class UEventInstanceWidgetRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;
  
    setupController(controller) {
      controller.set('eventSeries', this.contextService.eventSeries);
      controller.set('eventInstance', this.contextService.eventInstance);
    }
}
