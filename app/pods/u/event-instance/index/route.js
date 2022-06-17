import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default class UEventInstanceIndexRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service
  contextService

  async model() {
    return {
        businessTypes: await this.store.query('business-type',{
            sort: 'name'
        }),
    }
  }

  setupController(controller, models) {
    controller.set('eventSeries', this.contextService.eventSeries)
    controller.set('eventInstance', this.contextService.eventInstance)
    controller.set('businessTypes', models.businessTypes)
  }
}
