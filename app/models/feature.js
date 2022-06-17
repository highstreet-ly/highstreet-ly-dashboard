import Model, { hasMany } from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class FeatureModel extends Model {
    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    featureType

    @attr('string')
    description

    @attr('string')
    claimValue

    @attr('number', {
      defaultValue() { return 0 }
    })
    sortOrder

    @hasMany('plan')
    plans

    @hasMany('addOn')
    addOns

    @hasMany('business-type-feature-template')
    businessTypeFeatureTemplates
}
