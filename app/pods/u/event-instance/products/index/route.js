import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UEventInstanceProductsRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    contextService;

    @service
    store

    async model() {
        await this.modelFor('u.event-instance');
    }

    setupController(controller) {
        controller.set('loading', false);
        controller.set('eventSeries', this.contextService.eventSeries);
        controller.set('eventInstance', this.contextService.eventInstance);
        controller.set('productCategoryQuery', {
            filter: {
                'event-instance-id': this.contextService.eventInstance.id,
            },
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0,
            },
          
            include: 'ticket-type-configurations'
        });
        controller.set('queryBuilder', function (search, q) {
            delete q.filter
            q['filter'] = `expr:equals(event-instance-id,'${this.contextService.eventInstance.id}')`
            q['filter[ticket-type-configurations]'] = `expr:startsWith(normalized-name,'${search.toUpperCase()}')`
        })
    }
}
