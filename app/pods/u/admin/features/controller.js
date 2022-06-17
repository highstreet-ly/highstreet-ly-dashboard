import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class UAdminFeaturesController extends Controller {
  @service
  notifications;

  @tracked
  reorderMode = false;

  @tracked
  loading = false;

  sortBy = ['sortOrder'];
  @sort('features', 'sortBy')
  sortedFeatures;

  @tracked
  selectedFeatureTypeType = null

  featureTypes = [{
    name: 'EventInstance',
  }, {
    name: 'Plan'
  }]

  @action
  reordered() {
    this.features.forEach(function (feature, i) {
      feature.sortOrder = i;
    });
  }

  @action
  async didSelectFeatureType(type) {

    if (!type) {
      this.set('features', await this.store.query('feature', {
        include: 'add-ons,plans,business-type-feature-templates',
      }))
    }
    else {
      this.selectedFeatureTypeType = type
      this.set('features', await this.store.query('feature', {
        filter: `expr:equals(feature-type,'${type.name}')`,
        include: 'add-ons,plans,business-type-feature-templates',
      }))
    }

  }

  @action
  async save() {
    this.loading = true

    await this.features.forEach(async function (feature) {
      await feature.save();
    });

    this.loading = false;
    this.reorderMode = false;
    this.notifications.success('Order saved', { autoClear: true });
  }

  @action
  async cancel() {
    await this.features.forEach(async function (feature) {
      await feature.rollbackAttributes();
    });
    this.reorderMode = false;
  }
}
