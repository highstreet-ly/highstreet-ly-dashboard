import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  intl: service(),
  metrics: service(),
  router: service(),

  session: service(),
  sonaticketSignalr: service(),

  init() {
    this._super(...arguments);

    let router = this.router;
    router.on('routeDidChange', () => {
      const page = router.currentURL;
      const title = router.currentRouteName || 'unknown';

     // this.metrics.trackPage({ page, title });
    });
  },

  model() {
    if (this.session.isAuthenticated) {
      this.sonaticketSignalr.initialize(this.currentUser.eventOrganiser.id);
    }
  },

  async beforeModel() {
    this._super(...arguments);
    this.intl.setLocale(['en-gb']);
    await this._loadCurrentUser();
  },

  async sessionAuthenticated() {
    let _super = this._super;
    await this._loadCurrentUser();
    _super.call(this, ...arguments);
  },

  async _loadCurrentUser() {
    try {
      await this.currentUser.load()
    } catch (e) {
      this.session.invalidate()
    }
    if (this.session.isAuthenticated) {
      if (!this.currentUser.isDashUser) {
        console.log('user does not have the required roles to access this resource')
        this.session.invalidate()
      }
    }
  }
});
