import Model, { belongsTo } from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class OrdersByDayModel extends Model {

    @attr('number')
    year

    @attr('number')
    month

    @attr('number')
    day

    @attr('number')
    total

    @attr('number')
    totalFunds

    @attr('string')
    eventInstanceId

    @belongsTo('eventInstance')
    eventInstance

    @belongsTo('eventSeries')
    eventSeries

    @belongsTo('eventOrganiser')
    eventOrganiser

    @belongsTo('dashboardStat')
    dashboardStat

    @attr('string')
    eventInstanceId

    @attr('string')
    eventSeriesId

    @attr('string')
    eventOrganiserId
}
