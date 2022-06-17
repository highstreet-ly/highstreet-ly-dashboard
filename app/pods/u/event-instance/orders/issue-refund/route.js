import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UEventInstanceOrdersIssueRefundRoute extends Route.extend(AuthenticatedRouteMixin) {

    @service
    contextService;

    async model(params) {
        let order = await this.store.findRecord('order', params.orderId)

        return {
            order: order,
            backRoute:  params.backroute,
            payment: await this.store.findRecord('payment', order.paymentId, {
                include: 'charges'
            }),
            charges: await this.store.query('charge', {
                filter: {
                    'payment-id': order.paymentId
                }
            })
        };
    }

    setupController(controller, model) {
        controller.set('editingOrder', model.order);
        controller.set('eventInstance', this.contextService.eventInstance);
        controller.set('backRoute', model.backRoute);
        controller.set('payment', model.payment);
        controller.set('charges', model.charges);
    }
}
