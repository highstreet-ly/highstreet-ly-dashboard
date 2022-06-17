import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class BusinessTypeFeatureTemplateModel extends Model {

    @belongsTo('businessType')
    businessType

    @hasMany('feature')
    features

}
