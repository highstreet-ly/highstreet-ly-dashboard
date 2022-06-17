import Route from '@ember/routing/route';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminPlansRoute extends Route {
   
    setupController(controller, models){
        controller.set('plansQuery', {
            filter: {
                'event-organiser-id': "isnull:"
            },
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 0
            },
            sort: 'name'
        })
        controller.set('searchQuery', "expr:and(equals(event-organiser-id,'isnull:'),FILTER)")
        controller.set('editRoute', 'u.admin.plan-edit')
        controller.set('subscribersRoute', 'u.admin.plan-subscribers')
    }
}
