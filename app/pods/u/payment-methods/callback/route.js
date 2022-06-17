import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class CallbackRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service
    store;

    @service
    currentUser;

    @service
    polling;

    @service('message-bus')
    messageBus;

    queryParams = {
        scope: {
            refreshModel: true
        },
        code: {
            refreshModel: true
        },
        error: {
            refreshModel: true
        },
        state: {
            refreshModel: true
        }
    };

    async model(params) {
        // we need to make sure the user and associated organiser model is loaded before anything else happens
        this.messageBus.publish('event-organiser-linking-to-stripe');
        await this.currentUser.load();
        await this.currentUser.reloadEventOrganiser();

        let o = this.currentUser.eventOrganiser
        o.set('stripeCode', params.code);
        await o.save({ adapterOptions: { command: "LinkEventOrganiserAccountToStripe" } });

        this.messageBus.publish('event-organiser-linked-to-stripe');
        this.transitionTo('u.payment-methods');
    }
}
