import classic from 'ember-classic-decorator';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import Controller from '@ember/controller';
import {computed} from '@ember/object';

@classic
export default class EventSeriesController extends Controller {
  @service
  contextService;

  @service
  router;

  @service
  statsService;

  @service
  currentUser;

  @computed()
  get hasMultiShopFeature(){
    return this.currentUser.hasFeatureSync('multi-shop')
  }

  @computed('eventSeries.id')
  get totalFundsDayBySeriesStatsTotalFundsSummedById() {

    let data = this.statsService.getTotalFundsDayBySeriesStatsTotalFundsSummedById(this.eventSeries.id);

    return data;
  }

  @computed('eventSeries.id')
  get registeredInterestBySeriesStatsById() {

    let data = this.statsService.getRegisteredInterestBySeriesStatsById(this.eventSeries.id);

    return data;
  }

  @computed('eventSeries.id')
  get totalTicketsSoldDayBySeriesStatsTotalFundsSummedById() {

    let data = this.statsService.getTotalTicketsSoldDayBySeriesStatsTotalFundsSummedById(this.eventSeries.id);

    return data;
  }

  @computed('eventSeries.id')
  get totalOrdersProcessedBySeriesStatsById() {

    let data = this.statsService.getTotalOrdersProcessedBySeriesStatsById(this.eventSeries.id);

    return data;
  }

  @computed('eventSeries.id')
  get registeredInterestBySeriesStatsGroupedChartDataById() {

    let data = this.statsService.getRegisteredInterestBySeriesStatsGroupedChartDataById(this.eventSeries.id);

    if (data && data.chartData) {
      return data.chartData;
    } else {
      return null;
    }
  }

  @computed('eventSeries.id')
  get ticketsSoldByDayBySeriesStatsGroupedChartDataById() {

    let data = this.statsService.getTicketsSoldByDayBySeriesStatsGroupedChartDataById(this.eventSeries.id);

    if (data && data.chartData) {
      return data.chartData;
    } else {
      return null;
    }
  }

  @computed('eventSeries.id')
  get ordersProcessedByDayBySeriesStatsGroupedChartDataById() {

    let data = this.statsService.getOrdersProcessedByDayBySeriesStatsGroupedChartDataById(this.eventSeries.id);

    if (data && data.chartData) {
      return data.chartData;
    } else {
      return null;
    }
  }

  @action
  async save() {
    this.set('saving', true);
    await this.eventSeries.save();
    this.set('saving', false);
    this.notifications.success('Your changes have been saved', {autoClear: true});
    this.router.navigateTo('u.event-series', this.eventSeries.slug);
  }
}
