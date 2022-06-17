import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'
import Env from 'sonaticket-dashboard/config/environment';

export default class UEventInstanceSubscribablesEditRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service contextService

    async model(params) {
        return {
            plan: await this.store.findRecord('plan', params.planId, {include: 'ticket-types',})
        }
    }

    setupController(controller, model) {
        controller.set('plan', model.plan);
        controller.set('eventInstance', this.contextService.eventInstance);
        controller.set('productsQuery', {
            filter: {
                "event-instance-id": this.contextService.eventInstance.id
            },
            
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            },
            sort: 'name'
        })

        controller.set('searchQuery', "expr:and(equals(event-instance-id,'" + this.contextService.eventInstance.id + "'),FILTER)")
        
    }
}
