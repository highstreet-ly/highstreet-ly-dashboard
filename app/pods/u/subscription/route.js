import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class USubscriptionRoute extends Route {
  @service
  currentUser;

  async model() {
    return {
      plans: await this.store.query('plan',
        {
          filter: `expr:and(equals(enabled-in-portal,'true'),equals(publicly-visible,'true'))`,
          include: 'features,add-ons',
        }
      ),
    };
  }

  async setupController(controller, models) {
    controller.set('plans', models.plans);
    controller.set('currentSubscription', await this.currentUser.currentSubscription);
  }
}
