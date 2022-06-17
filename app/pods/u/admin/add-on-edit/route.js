import Route from '@ember/routing/route';

export default class UAdminAddOnEditRoute extends Route {
    async model(params) {
        let addOn = await this.store.findRecord('addOn', params.id, {
            include: 'features,plans',
        })

        await addOn.get('plans')

        return {
            addOn: addOn,
            features: await this.store.query('feature', {})
        }
    }

    setupController(controller, models) {
        controller.set('addOn', models.addOn)
        controller.set('features', models.features)
    }
}
