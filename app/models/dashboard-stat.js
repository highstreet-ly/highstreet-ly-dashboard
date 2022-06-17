import Model, { belongsTo, hasMany } from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class DashboardStatModel extends Model {

    @attr('number')
    fundsAllTime;

    @attr('number')
    ordersProcessedAllTime;

    // @attr('raw')
    // ordersProcessedByDay;

    @attr('number')
    registeredInterestAllTime;

    // @attr('number')
    // registeredInterestByDay;

    @attr('number')
    ticketsSoldAllTime;

    // @attr('raw')
    // ticketsSoldByDay;

    @attr('number')
    totalOrdersAbandoned;

    @attr('number')
    totalOrdersCreated;

    @attr('number')
    totalOrdersFulfilled;

    @belongsTo('eventOrganiser')
    eventOrganiser

    @hasMany('ordersByDay')
    ordersProcessedByDay

    @hasMany('refundsByDay')
    refundsProcessedByDay

    @hasMany('registeredInterestByDay')
    registeredInterestByDay

    @hasMany('ticketsSoldByDay')
    ticketsSoldByDay
}
