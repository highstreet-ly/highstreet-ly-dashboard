import Component from '@glimmer/component'
import {tracked} from '@glimmer/tracking'
import {action} from '@ember/object'
import { sort } from '@ember/object/computed'

export default class ProductPanelBlockComponent extends Component {
  @tracked
  reorderMode = false

  @tracked
  loading = false

  // This is just there for the sorting
  @tracked
  productCategory

  productSort = ['sortOrder']
  @sort('args.productCategory.ticketTypeConfigurations', 'productSort')
  sortedProducts

  @action
  reordered() {
    this.args.productCategory.ticketTypeConfigurations.forEach(function (product, i) {
      product.sortOrder = i
    })
  }

  @action
  async save() {
    this.loading = true

    await this.args.productCategory.ticketTypeConfigurations.forEach(async function (product, i) {
      await product.save()
    })

    this.loading = false
    this.reorderMode = false
  }

  @action
  async cancel() {
    await this.args.productCategory.ticketTypeConfigurations.forEach(async function (product, i) {
      await product.rollbackAttributes()
    })
    this.reorderMode = false
  }

  @action
  async publishTicket(ticket) {
    ticket.set('isPublished', true)
    await ticket.save({ adapterOptions: { command: "TicketTypePublished" } })
  }

  @action
  async unpublishTicket(ticket) {
    ticket.set('isPublished', false)
    await ticket.save({ adapterOptions: { command: "TicketTypeUnpublished" } })
  }
}
