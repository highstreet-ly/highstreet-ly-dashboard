import Route from '@ember/routing/route';

export default class UAdminPlanEditRoute extends Route {
    async model(params) {
        return {
            plan: await this.store.findRecord('plan', params.id, {
                include: 'add-ons,features',
            }),
            features: await this.store.query('feature', {})
        }
    }

    setupController(controller, models) {
        controller.set('plan', models.plan)
        controller.set('features', models.features)
    }

}
