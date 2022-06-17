import Model, { belongsTo, hasMany } from '@ember-data/model'
import { attr } from '@ember-data/model';

export default class ProductExtraGroupModel extends Model {
    @attr('string')
    name

    @attr('string')
    normalizedName

    @attr('string')
    description

    @attr('string')
    mainImageId

    @attr('number', {
        defaultValue() { return 0 }
    })
    sortOrder

    @attr('boolean')
    enabled

    @attr('raw')
    metadata

    @belongsTo('event-instance')
    eventInstance

    @attr('string')
    eventInstanceId

    @hasMany('ticket-type')
    ticketTypes

    @hasMany('ticket-type-configuration')
    ticketTypeConfigurations
}
