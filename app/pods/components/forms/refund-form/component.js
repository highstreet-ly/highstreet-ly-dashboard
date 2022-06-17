import Component from "@glimmer/component";
import { get, action, computed } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import Promise, { resolve } from 'rsvp';

export default class FormsRefundFormComponent extends Component {
  @service store;

  @tracked
  loading = true;

  @tracked
  saving = false;

  @tracked
  refundType = 'full';

  @tracked
  customAmount = '0.00'

  @tracked
  refundNote

  get itemsAmount() {
    let total = 0;
    this.args.order.tickets.forEach(item => {
      if (item.selected) {
        total += item.get('ticketDetails.price');
      }
    });
    return total;
  }

  @action
  async didInsert() {
    this.payment = await this.store.findRecord(
      "payment",
      this.args.order.paymentId,
      {
        include: "charges.refunds",
      }
    );

    this.loading = false;
  }

  @action
  itemToggled(item) {
    console.log(item, item.selected);
    item.selected = true;
  }

  getActiveCharge() {
    let charges = this.payment.charges;

    for (let i = 0; i < charges.length; i++) {
      let charge = charges.objectAt(i);

      if (charge.amountCaptured && charge.amountCaptured > 0) {
        return charge;
      }
    }
  }

  @action
  async issueRefund() {
    this.saving = true;

    let refunds = [];

    var charge = this.getActiveCharge()


    // Full refund
    if (this.refundType === 'full') {

      var refund = this.store.createRecord("refund", {
        charge: charge,
        amount: charge.amountCaptured,
        refundNote: this.refundNote,
      })

      await refund.save();

    } else if (this.refundType === 'custom') {
      var refund = this.store.createRecord("refund", {
        charge: charge,
        amount: this.customAmount,
        refundNote: this.refundNote,
      })

      await refund.save();
    } else if (this.refundType === 'items') {
      let items = [];
      let totalToRefund = 0
     
      this.args.order.tickets.forEach(item => {
        if (item.selected) {
          items.push(item);
          totalToRefund += item.get('ticketDetails.price') * item.get('ticketDetails.quantity')
        }
      });

      var refund = this.store.createRecord("refund", {
        charge: charge,
        amount: totalToRefund,
        refundNote: this.refundNote,
      })

      await refund.save();
    }

    this.saving = false;
    this.args.onAfterRefundSave();
  }
}
