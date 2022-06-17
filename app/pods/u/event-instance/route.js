import classic from 'ember-classic-decorator'
import { inject as service } from '@ember/service'
import Route from '@ember/routing/route'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import Env from 'sonaticket-dashboard/config/environment'

@classic
export default class EventInstanceRoute extends Route.extend(AuthenticatedRouteMixin) {

  @service
  currentUser;
  
  @service
  contextService

  async model(params) {
    await this.currentUser.getStats();
    await this.contextService.setInstance(params.slug)
  }

  setupController(controller) {
    controller.set('eventSeries', this.contextService.eventSeries)
    controller.set('eventInstance', this.contextService.eventInstance)

    controller.set('waitingListQuery', {
      page: {
        'size': 2,
        'number': 0
      },
      filter: {
        "event-instance-id": this.contextService.eventInstance.id
      }
    })
  }
}
