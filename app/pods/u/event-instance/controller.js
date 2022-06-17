import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class EventInstanceController extends Controller {
  queryParams = [];
  search = '';
  ordersQuery = null;

  @service
  eventInstancePublisher

  @service
  statsService;

  @service
  contextService;

  @service
  currentUser;

  @computed()
  get hasWidgetFeature() {
    return this.currentUser.hasFeatureSync('widget')
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get totalFundsDayByInstanceStatsTotalFundsSummedById() {
    return this.statsService.getTotalFundsDayByInstanceStatsTotalFundsSummedById(this.contextService.eventInstance.id);
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get totalOrdersProcessedByInstanceStatsById() {
    return this.statsService.getTotalOrdersProcessedByInstanceStatsById(this.contextService.eventInstance.id);
  }

  @computed('contextService.eventInstance.id', 'eventInstance.id')
  get totalTicketsSoldDayByInstanceStatsTotalFundsSummedById() {
    return this.statsService.getTotalTicketsSoldDayByInstanceStatsTotalFundsSummedById(this.contextService.eventInstance.id);
  }

  @computed('Env.sonatribe.productSubscriptionsEnabled')
  get isProductSubscriptionsEnabled() {
      return Env.sonatribe.productSubscriptionsEnabled;
  }

  @computed()
  get hasOperatorAppFeature(){
    return this.currentUser.hasFeatureSync('operator-app')
  }

  @computed()
  get opsURL(){

    let randomString = function (length) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    let nonce = randomString(32);
    let responseType = `id_token token`;

    //return `${Env.sonatribe.authenticationURL}/connect/authorize?client_id=operator&redirect_uri=${Env.sonatribe.opsURL}/callback&response_type=${responseType}&scope=offline_access%20openid%20profile%20sonatribe.permissions.api%20sonatribe.ticketmanagement.api%20sonatribe.payment.api%20sonatribe.ticketreservations.api%20sonatribe.operator.api&nonce=${nonce}`
  return Env.sonatribe.opsURL

}


  @action
  async publishEvent() {
    this.eventInstancePublisher.publishEvent(this.eventInstance, this.eventSeries);
  }

  @action
  async unPublishEvent() {
    this.set('eventInstance.isPublished', false);
    await this.eventInstance.save({ adapterOptions: { command: "UnPublishEventInstance" } });
  }

  @action
  async toggleShopOpen(){
    this.set('eventInstance.isOpen', !this.eventInstance.isOpen);
    await this.eventInstance.save();
  }
}
