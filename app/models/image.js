import Model, { belongsTo } from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class ImageModel extends Model {

    @belongsTo('eventInstance')
    eventInstance

    @belongsTo('eventSeries')
    eventSeries

    @belongsTo('eventOrganiser')
    eventOrganiser

    @belongsTo('ticketTypeConfiguration')
    ticketTypeConfiguration

    @belongsTo('ticketType')
    ticketType

    @attr('string')
    externalImageId
}
