import Route from '@ember/routing/route';

export default class UAdminSubscriptionRoute extends Route {
    async model(params) {
        return {
            plan: await this.store.findRecord('plan', params.id, {
                include: 'add-ons',
            }),
            subscription: await this.store.findRecord('subscription', params.subId, {
                include: 'add-ons,event-organiser',
            })
        }
    }

    setupController(controller, model) {
        model.subscription.user = this.store.findRecord('user', model.subscription.userId)
        controller.set('plan', model.plan)
        controller.set('subscription', model.subscription)
    }
}
