import Route from '@ember/routing/route';

export default class UAdminFeatureEditRoute extends Route {
    async model(params) {
        let feature = await this.store.findRecord('feature', params.id, {
            include: 'add-ons,plans,business-type-feature-templates',
        })

        await feature.get('plans')
        await feature.get('addOns')
        await feature.get('businessTypeFeatureTemplates')

        return {
            feature: feature
        }
    }

    setupController(controller, models) {
        controller.set('feature', models.feature)
    }
}
