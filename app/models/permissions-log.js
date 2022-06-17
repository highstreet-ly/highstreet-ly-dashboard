import Model, { hasMany, attr } from '@ember-data/model';

export default class PermissionsLogModel extends Model {
    @attr('string')
    message

    @attr('string')
    level

    @attr('string')
    raiseDate

    @attr('string')
    exception

    @attr('string')
    properties
}
