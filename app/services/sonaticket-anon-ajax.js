import { computed } from '@ember/object';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'sonaticket-dashboard/config/environment';

export default AjaxService.extend({
  host: '/',
  crossDomain: true,
  withCredentials: true,
  cache: false,

  init() {
    this._super(...arguments);
    let trustedDomains = ENV.sonatribe.AllowedDomains.split(',');
   
    this.trustedHosts = trustedDomains;
  },

  headers: computed({
    get() {
      let headers = {};
     
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
      return headers;
    }
  })
});