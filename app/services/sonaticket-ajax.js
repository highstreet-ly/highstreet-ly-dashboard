import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'sonaticket-dashboard/config/environment';

export default AjaxService.extend({
  host: '/',
  session: service(),
  crossDomain: true,
  withCredentials: true,
  cache: false,

  init() {
    this._super(...arguments);
    let trustedDomains = ENV.sonatribe.AllowedDomains.split(',');
    this.trustedHosts = trustedDomains;
  },

  headers: computed('session.isAuthenticated', 'session.session.content.authenticated.access_token', {
    get() {
      let headers = {};
      const authToken = this.get('session.session.content.authenticated.access_token');

      if (authToken) {
        headers['Authorization'] = 'Bearer ' + authToken;
      }
      headers['Accept'] = 'application/vnd.api+json';
      headers['Content-Type'] = 'application/vnd.api+json';
      return headers;
    }
  }),
  request(url, options) {
    return this._super(url, options).catch((error) => {
      if (error.payload && error.payload === 'Unauthorized') {
        if (this.get('session.isAuthenticated')) {
          this.session.invalidate()
        }
      }
    });
  }
});