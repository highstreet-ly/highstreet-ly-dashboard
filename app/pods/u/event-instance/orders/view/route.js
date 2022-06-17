import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class EventInstanceOrdersViewRoute extends Route.extend(AuthenticatedRouteMixin) {

  @service store;

  @service
  contextService;

  backRouteTemplate = "u.event-instance.orders."

  async model(params) {
    let backRoute =  `${this.backRouteTemplate}${params.backroute}`;
    let order = await this.store.findRecord('order', params.orderId, {include: 'tickets,tickets.ticket-details,tickets.ticket-details.product-extras,tickets.ticket-type-configuration'})
    let payment = await this.store.query(
      "payment",
      {
        filter: `expr:equals(order-id,'${params.orderId}')`,
        include: "charges.refunds",
        sort:{
          "charges": 'date-created',
          "charges.refunds":'date-created'
        },
      }
    );
    return {
      order: order,
      payment: payment.firstObject,
      backRoute,
      backRouteSegment: params.backroute,
    };
  }

  setupController(controller, model) {
    controller.set('payment', model.payment);
    controller.set('editingOrder', model.order);
    controller.set('backRoute', model.backRoute);
    controller.set('backRouteSegment', model.backRouteSegment);
    controller.set('eventInstance', this.contextService.eventInstance);
  }
}
