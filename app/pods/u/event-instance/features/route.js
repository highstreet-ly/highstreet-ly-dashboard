import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UEventInstanceFeaturesRoute extends Route {
  @service
  contextService;

  @service
  currentUser

  async model(){
    return {
      features: this.store.query('feature', {
        filter: `expr:equals(feature-type,'EventInstance')`
      })
    }
  }

  setupController(controller, models) {
    controller.set('features', models.features);
    controller.set('eventOrganiser', this.currentUser.eventOrganiser);
    controller.set('eventSeries', this.contextService.eventSeries);
    controller.set('eventInstance', this.contextService.eventInstance);
  }
}
