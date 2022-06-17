import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import OAuth2ImplicitGrantCallbackRouteMixin from 'ember-simple-auth/mixins/oauth2-implicit-grant-callback-route-mixin';

@classic
export default class CallbackRoute extends Route.extend(OAuth2ImplicitGrantCallbackRouteMixin) {
  authenticator = 'authenticator:oauth2';

  @service
  session;

  beforeModel() {

    if (this.session.isAuthenticated) {
     this.transitionTo('u.index');
    }
  }
}