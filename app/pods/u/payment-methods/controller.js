import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { or } from '@ember/object/computed';
import Controller from '@ember/controller';
import ENV from 'sonaticket-dashboard/config/environment';

@classic
export default class PaymentMethodsController extends Controller {
  @service
  messageBus;

  @service
  currentUser;

  async init() {
    super.init(...arguments);
    this.messageBus.subscribe('event-organiser-linked-to-stripe', this, this.setEventOrganiserLinkedToStripe);
    this.messageBus.subscribe('event-organiser-linking-to-stripe', this, this.setEventOrganiserLinkingToStripe);
  }

  @or('isConnectedToStripe', 'currentUser.eventOrganiser.isConnectedToStripe')
  isConnectedToStripeComputed;

  @computed('ENV.sonatribe.stripeClientId')
  get stripeOauthUrl() {
    let redirect = `${window.location.origin}/u/payment-methods/callback`
    return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${ENV.sonatribe.stripeClientId}&scope=read_write&redirect_uri=${redirect}`;
  }

  setEventOrganiserLinkingToStripe() {
    this.set('loadingConnection', true)
  }

  setEventOrganiserLinkedToStripe() {
    this.set('loadingConnection', false)
    this.set('currentUser.eventOrganiser.isConnectedToStripe', true);
  }
}
