import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

@classic
export default class FormsStockFormComponent extends Component {
  @tracked newQuantity = 0;
  @tracked loading = false;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.newQuantity = this.product.availableQuantity;
  }

  @action
  async addStockQuantity() {
    this.loading = true;
    this.product.addQuantity = (this.newQuantity - this.product.availableQuantity);
    await this.product.save({adapterOptions: {command: 'AddStockQuantity'}});
    this.product.availableQuantity = this.newQuantity;
    this.loading = false;
  }
}
