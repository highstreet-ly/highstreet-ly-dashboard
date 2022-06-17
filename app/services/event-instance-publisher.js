import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class EventInstancePublisherService extends Service {
    @service
    store;

    @service
    router;

    @service
    notifications;

    @service
    currentUser;

    @service
    contextService;

    async publishEvent(eventInstance, eventSeries) {
        // check to see if the event has a delivery methid selected
        // check to see if the event has delivery radius information
        // check to see if the event has tickets
        // check to see if any of them have a fee - we only support paid for tickets rn but we won't soon
        // check to see if the owning event organiser is connected to stripe
        // - if they are not
        // - is the account we are logged in with under that org?
        //   -- yes: offer link to connect to stripe
        //   -- no: the owner needs to connect

        if (!eventSeries) {
            eventSeries = await this.contextService._getEventSeriesById(eventInstance.eventSeriesId);
        }

        if (!eventInstance.isToTable && !eventInstance.isClickAndCollect && !eventInstance.isLocalDelivery && !eventInstance.isNationalDelivery) {
            this.notifications.warning("Cannot enable shop: You must select a delivery method. Click here to go to your shop settings", {
                autoClear: true,
                onClick: () => {
                    this.router.transitionTo("u.event-instance", eventInstance.slug);
                }
            });
            return;
        }

        // postcode: attr('string'),
        // deliveryRadiusMiles: attr('number'),
        if (eventInstance.isLocalDelivery && (isEmpty(eventInstance.postcode) || isEmpty(eventInstance.deliveryRadiusMiles) || eventInstance.deliveryRadiusMiles === 0)) {
            this.notifications.warning("Cannot enable shop: to enable local delivery, you must set the postcode and delivery radius. Click here to go to your shop settings", {
                autoClear: true,
                onClick: () => {
                    this.router.transitionTo("u.event-instance", eventInstance.slug);
                }
            });
            return;
        }

        let tickets = await this.store.query('ticket-type-configuration', {
            filter: {
                'event-instance-id': eventInstance.id
            }
        });

        if (tickets.length > 0) {
            // is the event org striped
            let owningOrg = await this.store.findRecord('event-organiser', eventSeries.eventOrganiserId);

            if (!owningOrg.isConnectedToStripe) {
                // we aren't connected to stripe and we have tickets that cost ££
                if (owningOrg.id !== this.currentUser.eventOrganiser.id) {
                    this.notifications.warning("Cannot enable shop: The shop owners has not connected their stripe account", {
                        autoClear: true,
                    });
                    return;
                } else {
                    this.notifications.warning("Cannot enable shop: You have not connected your stripe account. Click here to go to your stripe settings", {
                        autoClear: true,
                        onClick: () => {
                            this.router.transitionTo("u.payment-methods");
                        }
                    });
                    return;
                }
            } else {
                let atleastOnePublished = false;
                tickets.forEach(t => {
                    if (t.isPublished) {
                        atleastOnePublished = true;
                    }
                });
                if (atleastOnePublished) {
                    eventInstance.set('isPublished', true);
                    await eventInstance.save({ adapterOptions: { command: "PublishEventInstance" } });
                    this.notifications.success(`${eventInstance.name} is now published`, {
                        autoClear: true,
                    });

                    return;

                } else {
                    this.notifications.warning("Cannot enable shop: You do not have any enabled products. Click here to view your product list", {
                        autoClear: true,
                        onClick: async () => {
                            await this.router.transitionTo("u.event-instance.products", eventInstance.slug);
                        }
                    });
                    return;
                }
            }
        } else {
            this.notifications.warning("Cannot enable shop: You do not have any enabled products. Click here to view your product list", {
                autoClear: true,
                onClick: async () => {
                    await this.router.transitionTo("u.event-instance.products", eventInstance.slug);
                }
            });
            return;
        }
    }

}
