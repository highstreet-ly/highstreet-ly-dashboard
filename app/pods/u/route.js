import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Env from 'sonaticket-dashboard/config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class URoute extends Route.extend(AuthenticatedRouteMixin) {

  @service
  currentUser;

  async model() {
    await this.currentUser.getStats();
    return this.store.query('event-series',  {
      filter: {
        'event-organiser-id': this.currentUser.eventOrganiser.id
      }
    });
  }

  setupController(controller, model) {
    controller.set('chargeBeeSiteName', Env.sonatribe.chargeBeeSiteName)
    controller.set('services', model);
    controller.set('version', Env.sonatribe.Version);
    controller.set('year', new Date().getFullYear());
  }
}
