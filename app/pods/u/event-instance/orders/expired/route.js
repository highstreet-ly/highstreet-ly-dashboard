import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UEventInstanceOrdersExpiredRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;

    @service
    toDateString;

    async model() {
        await this.modelFor('u.event-instance');
    }

    setupController(controller) {
        let date = new Date();
        
        controller.set('eventSeries', this.contextService.eventSeries);
        controller.set('eventInstance', this.contextService.eventInstance);
        controller.set('ordersQuery', {
            filter: `expr:and(equals(event-instance-id,'${this.contextService.eventInstance.id}'),equals(status,'Expired'))`,
            // {
            //     'event-instance-id': this.contextService.eventInstance.id,
            //     'status': 'Expired',
            //    // 'confirmed-on': `gt:${this.toDateString.parse(date, -2)}`
            // },
            sort: '-created-on',
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            }
        });
    }
}
