import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class IndexController extends Controller {
  @service
  currentUser;

  @service
  statsService;

  constructor(){
    super(...arguments);
  }

  @computed('currentUser.userModel.{email,firstName}')
  get userName() {
    console.log(this.currentUser.userModel);
    return this.currentUser.userModel.firstName ?? this.currentUser.userModel.email;
  }

  @computed('eventInstance.id')
  get ticketsSoldByDayByInstanceStatsGroupedChartDataById() {
    let data = this.statsService.getTicketsSoldByDayByOrganisationStatsGroupedChartDataById();
    return data;
  }

  @computed('eventInstance.id')
  get ordersProcessedByDayByInstanceStatsGroupedChartDataById() {
    let data = this.statsService.getOrdersProcessedByDayByOrganisationStatsGroupedChartDataById();
    return data;
  }

  @computed('eventInstance.id')
  get registeredInterestByOrganisationStatsChartDataById() {
    let data = this.statsService.getRegisteredInterestByOrganisationStatsChartDataById();
    return data;
  }

  @computed('ENV.sonatribe.stripeClientId')
  get stripeOauthUrl() {
    let redirect = `${window.location.origin}/u/payment-methods/callback`
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${Env.sonatribe.stripeClientId}&scope=read_write&redirect_uri=${redirect}`;
  }
}
