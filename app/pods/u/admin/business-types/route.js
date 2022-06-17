import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminBusinessTypesRoute extends Route {
    // async model(){
    //     return {
    //         businessTypes: this.store.query('business-type',{})
    //     }
    // }

    @service
    contextService;

    @service
    store

    async model() {
      
    }

    setupController(controller) {
        controller.set('loading', false);
        controller.set('eventSeries', this.contextService.eventSeries);
        controller.set('eventInstance', this.contextService.eventInstance);
        controller.set('businessTypesQuery', {
            
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0,
            },
            sort: 'name'
           
        });
        // controller.set('queryBuilder', function (search, q) {
        //     delete q.filter
        //     q['filter'] = `expr:equals(event-instance-id,'${this.contextService.eventInstance.id}')`
        //     q['filter[ticket-type-configurations]'] = `expr:startsWith(normalized-name,'${search.toUpperCase()}')`
        // })
    }

}
