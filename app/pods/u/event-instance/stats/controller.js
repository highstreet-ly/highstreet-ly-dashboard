import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class UEventInstanceStatsController extends Controller {
  @service
  statsService;

  @service
  contextService;

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get totalFundsDayBySeriesStatsTotalFundsSummedById() {
    return this.statsService.getTotalFundsDayByInstanceStatsTotalFundsSummedById(this.contextService.eventInstance.id);
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get totalOrdersProcessedByInstanceStatsById() {
    return this.statsService.getTotalOrdersProcessedByInstanceStatsById(this.contextService.eventInstance.id);
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get registeredInterestByInstanceStatsById() {
    return this.statsService.getRegisteredInterestByInstanceStatsById(this.contextService.eventInstance.id);
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get totalTicketsSoldDayByInstanceStatsTotalFundsSummedById() {
    return this.statsService.getTotalTicketsSoldDayByInstanceStatsTotalFundsSummedById(this.contextService.eventInstance.id);
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get registeredInterestByInstanceStatsGroupedChartDataById() {
    let data = this.statsService.getRegisteredInterestByInstanceStatsGroupedChartDataById(this.contextService.eventInstance.id);

    if (data && data.chartData) {
      return data.chartData;
    } else {
      return null;
    }
  }

  @computed('contextService.eventInstance.{id,name}')
  get ticketsSoldByDayByInstanceStatsGroupedChartDataById() {
    let data = this.statsService.getTicketsSoldByDayByInstanceStatsGroupedChartDataById(this.contextService.eventInstance.id, this.contextService.eventInstance.name);

    if (data && data.chartData) {
      return data.chartData;
    } else {
      return null;
    }
  }

  @computed('contextService.eventInstance.{id,name}', 'eventInstance.id')
  get ordersProcessedByDayByInstanceStatsGroupedChartDataById() {
    let data = this.statsService.getOrdersProcessedByDayByInstanceStatsGroupedChartDataById(this.contextService.eventInstance.id, this.contextService.eventInstance.name );

    if (data && data.chartData) {
      return data.chartData;
    } else {
      return null;
    }
  }
}
