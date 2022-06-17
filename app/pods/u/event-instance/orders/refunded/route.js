import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UEventInstanceOrdersRefundedRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;

    async model() {
        await this.modelFor('u.event-instance');
    }

    setupController(controller) {
        controller.set('eventSeries', this.contextService.eventSeries);
        controller.set('eventInstance', this.contextService.eventInstance);
        controller.set('ordersQuery', {
            filter: `expr:and(equals(event-instance-id,'${this.contextService.eventInstance.id}'),equals(status,'Refunded'))`,
            sort: '-refunded-date-time',
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            }
        });
    }
}
