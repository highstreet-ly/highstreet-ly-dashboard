import Route from '@ember/routing/route';

export default class UAdminFeaturesRoute extends Route {
    async model(){
        return this.store.query('feature', {
          sort: 'sort-order',
          include: 'add-ons,plans,business-type-feature-templates',
        })
    }

    setupController(controller, model) {
      controller.set('features', model);
      controller.set('selectedFeatureTypeType', {
        name: 'Plan'
      });
    }
}
