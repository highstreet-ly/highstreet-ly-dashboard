import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UEventInstanceOrdersViewController extends Controller {
    @service
    router

    queryParams = ['backroute']

    dateValue = new Date()

    orderAdvisoryDate = new Date()
    orderAdvisoryTimeOfDay = "AM"

    imageOptions = 'h_25,w_25,r_max'

    @tracked
    showRefund = false;

    @tracked
    saving = false;

    @computed('editingOrder.status')
    get buttonsVisible() {
      let buttons = 2;
      if (this.editingOrder.status !== '6') {
        buttons = 3;
      }

      return buttons;
    }

    @computed('editingOrder')
    get canRefund(){
      return this.editingOrder.isRefundable()
    }

    @computed('editingOrder.platformFees', 'editingOrder.paymentPlatformFees')
    get platformFees(){
      return this.editingOrder.platformFees + this.editingOrder.paymentPlatformFees
    }

    @action
    async setProcessingComplete(order, backRoute) {
        if (this.editingOrder.isClickAndCollect) {
            this.editingOrder.set('customerDispatchAdvisory', `${this.orderAdvisoryDate} ${this.orderAdvisoryTimeOfDay}`)
        }

        await order.save({ adapterOptions: { command: "SetOrderProcessingComplete" } })
        this.router.transitionTo(backRoute)
    }

    @action
    onDateChange(date) {
        this.editingOrder.set('orderAdvisoryDate', date[0])
    }

    @action
    onTimeofDayChange(selected) {
        this.editingOrder.set('orderAdvisoryTimeOfDay', selected)
    }

    @action onBeforeSave() {
      this.saving = true;
    }

    @action onAfterSave() {
      this.saving = false;
    }
}
