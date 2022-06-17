import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { sort } from '@ember/object/computed';
import BasePanel from '../../BasePanel';
import Env from 'sonaticket-dashboard/config/environment';

@classic
export default class PanelsProductsPanelComponent extends BasePanel {
  @service contextService
  @service router

  @tracked productCategories = [];

  addTierVisible = false;
  pageSize = Env.sonatribe.defaultPageSize;
  pageNumber = null;
  recordCount = null;
  editingTicket = null;
  query = null;

  modelName = 'productCategories'
  endpoint = 'product-category'
  searchProperty = 'ticket-types.name'

  productCategorySort = ['sort-order']
  @sort('productCategories', 'productCategorySort')
  sortedProductCategories;

  groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
      let v = key instanceof Function ? key(x) : x[key];
      let el = rv.find((r) => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      }
      return rv;
    }, []);
  }

  @action
  async publishTicket(ticket) {
    ticket.set('isPublished', true);
    await ticket.save({ adapterOptions: { command: "TicketTypePublished" } });
  }

  @action
  async unpublishTicket(ticket) {
    ticket.set('isPublished', false);
    await ticket.save({ adapterOptions: { command: "TicketTypeUnpublished" } });
  }

  @action
  addNewProduct(){
    this.contextService.resetEditingProduct()
    this.router.transitionTo('u.event-instance.products.new', this.eventInstance.slug)
  }
}
