import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';


@classic
export default class UEventInstanceProductsRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  contextService;

  setupController(controller, model) {
    controller.set('eventInstance', this.contextService.eventInstance);
  }
}
