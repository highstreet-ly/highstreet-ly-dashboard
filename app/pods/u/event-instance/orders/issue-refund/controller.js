import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UEventInstanceOrdersIssueRefundController extends Controller {
    queryParams = ['backroute']
    
    @service
    router

    backRouteTemplate = "u.event-instance.orders."

    @action
    issueRefund(backRoute) {

        let backRouteuRL =  `${this.backRouteTemplate}${backRoute}`;

        this.editingOrder.save({ adapterOptions: { command: "IssueRefund" } })
        this.router.transitionTo(backRouteuRL)
    }
}
