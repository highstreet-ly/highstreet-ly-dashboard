import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UEventInstanceSubscribablesIndexRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;

    async model() {
        return {
            plans: await this.store.query('plan', {
                filter: {
                    'event-organiser-id': this.contextService.eventSeries.eventOrganiserId
                }
            }),
            eventInstance: this.contextService.eventInstance
        }
    }

    setupController(controller, models) {
        controller.set('plans', models.plans)
        controller.set('eventInstance', models.eventInstance)

        controller.set('plansQuery', {
            filter: {
                'event-instance-id': this.contextService.eventInstance.id
            },
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            },
            sort: 'name'
        });
        controller.set('searchQuery', "expr:and(equals(event-instance-id,'" + this.contextService.eventInstance.id + "'),FILTER)")
        controller.set('editRoute', 'u.event-instance.subscribables.edit')
        controller.set('subscribersRoute', 'u.event-instance.subscribables.subscribers')
    }
}
