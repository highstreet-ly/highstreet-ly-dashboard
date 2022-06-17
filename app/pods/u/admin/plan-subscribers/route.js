import Route from '@ember/routing/route';
import Env from 'sonaticket-dashboard/config/environment';

export default class UAdminPlanSubscribersRoute extends Route {
    async model(params){

        return params
        // return {
        //     subscriptions: await this.store.query('subscription', {
        //         filter:  `expr:equals(plan-id,'${params.id}')`,
        //         include: 'add-ons',
        //     })
        // }
    }

    setupController(controller, model) {

        controller.set('subscriptionsQuery', {
            filter:  `expr:equals(plan-id,'${model.id}')`,
            include: 'add-ons,event-organiser',
            page: {
                'size': Env.sonatribe.defaultPageSize,
                'number': 1
            }
        })

        controller.set('planId', model.id);

        // model.subscriptions.forEach( sub => {
        //     sub.user = this.store.findRecord('user', sub.userId)
        // })

        // controller.set('subscriptions', model.subscriptions)
    }
}
