import { attr } from '@ember-data/model';
import Model, { belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class BusinessTypeModel extends Model {
    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    description

    @attr('boolean')
    isPublished

    @hasMany('event-instance')
    eventInstances
}
