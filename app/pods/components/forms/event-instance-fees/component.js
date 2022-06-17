import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormsEventInstanceFeesComponent extends Component {

  @service
  notifications;

  loading = false;

  get customerPaysPlatformFee() {
    return this.args.eventInstance.platformFeePaidBy == 2;
  }

  get operatorPaysPlatformFee() {
    return this.args.eventInstance.platformFeePaidBy == 3;
  }

  get customerPaysPaymentPlatformFee() {
    return this.args.eventInstance.paymentPlatformFeePaidBy == 2;
  }

  get operatorPaysPaymentPlatformFee() {
    return this.args.eventInstance.paymentPlatformFeePaidBy == 3;
  }

  @action
  togglePlatformFee(value) {
    this.args.eventInstance.set('platformFeePaidBy', value);
  }

  @action
  togglePaymentPlatformFee(value) {
    this.args.eventInstance.set('paymentPlatformFeePaidBy', value);
  }

  @action
  async save() {
    set(this, 'loading', true);
    await this.args.eventInstance.save();
    this.notifications.success('Fees updated', { autoClear: true });
    set(this, 'loading', false);
  }
}
