import DS from 'ember-data'
import Env from 'sonaticket-dashboard/config/environment'
import { inject as service } from '@ember/service'

export default DS.JSONAPIAdapter.extend({
  session: service(),
  host: Env.sonatribe.DashApi,
  namespace: Env.sonatribe.apiNamespace,

  get headers() {
    let token = this.get('session.session.authenticated.access_token')
    let headers = {
      Authorization: `Bearer ${token}`,
    }

    if (this.command) {
      let contentType = `${this.command}`
      headers['Command-Type'] = contentType

      this.command = null
    }

    return headers
  },

  updateRecord(store, type, snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.command) {
      this.set('command', snapshot.adapterOptions.command)
    }

    return this._super(...arguments)
  },

  handleResponse(status) {
    if (status === 401 && this.get('session.isAuthenticated')) {
      this.session.invalidate()
    }
    return this._super(...arguments)
  }
})
