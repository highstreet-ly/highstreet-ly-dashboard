import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class OrderActionButtonComponent extends Component
{
  @action
  async setInProgress() {
    this.args.onBeforeSave();
    await this.args.order.save({ adapterOptions: { command: "SetOrderProcessing" } })
    this.args.order.status = 'Processing';
    this.args.onAfterSave();
    //this.router.transitionTo(backRoute)
  }

  @action
  async setComplete() {
    this.args.onBeforeSave();
    await this.args.order.save({ adapterOptions: { command: "SetOrderProcessingComplete" } })
    this.args.order.status = 'ProcessingComplete';
    this.args.onAfterSave();
    //this.router.transitionTo(backRoute)
  }

}
