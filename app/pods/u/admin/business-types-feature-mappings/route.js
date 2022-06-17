import Route from '@ember/routing/route';

export default class UAdminBusinessTypesFeatureMappingsRoute extends Route {
    async model(params) {
        return {
            featureTemplate: await this.store.query('business-type-feature-template', {
                filter: `expr:equals(business-type.id,'${params.id}')`,
                include: 'features,business-type',
            }),
            features: await this.store.query('feature', {
                filter: `expr:equals(feature-type,'EventInstance')`
            }),
            businessType: await this.store.findRecord('business-type', params.id),
        }
    }

    setupController(controller, models) {
        controller.set('featureTemplate', models.featureTemplate.firstObject)
        controller.set('features', models.features)
        controller.set('businessType', models.businessType)
    }
}
